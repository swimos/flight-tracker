package swim.flightinfo.eventhub;

import com.microsoft.azure.eventhubs.ConnectionStringBuilder;
import com.microsoft.azure.eventhubs.EventData;
import com.microsoft.azure.eventhubs.EventHubException;

import java.io.IOException;
import java.nio.charset.Charset;
import java.time.Duration;
import java.time.Instant;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.function.BiConsumer;

public class AutoScaleOnIngress {

  public static void autoScaleToEventHub(String contentToEH, String nameSpace, String eventHubName, String sasKeyName, String sasKey)
      throws EventHubException, ExecutionException, InterruptedException, IOException {

    final ConnectionStringBuilder connStr = new ConnectionStringBuilder()
        .setNamespaceName(nameSpace)
        .setEventHubName(eventHubName)
        .setSasKeyName(sasKeyName)
        .setSasKey(sasKey);

    // *********************************************************************
    // List of variables involved - to achieve desired LOAD / THROUGHPUT UNITS
    // 1 - NO OF CONCURRENT SENDS
    // 2 - BATCH SIZE - aka NO OF EVENTS CLIENTS CAN BATCH & SEND <-- and
    // there by optimize on ACKs returned from the Service (typically, this
    // number is supposed to help bring 2 down)
    // *********************************************************************
    final int NO_OF_CONCURRENT_SENDS= 1;
    final int BATCH_SIZE = contentToEH.length();

    final int NO_OF_CONNECTIONS = 1;

    final ScheduledExecutorService executorService = Executors.newScheduledThreadPool(2);

    final String connectionString = connStr.toString();

    final EventHubClientPool ehClientPool = new EventHubClientPool(NO_OF_CONNECTIONS, connectionString, executorService);

    ehClientPool.initialize().get();

    final CompletableFuture<Void>[] sendTasks = new CompletableFuture[NO_OF_CONCURRENT_SENDS];

    final Instant beforeSend = Instant.now();
    final List<EventData> eventDataList = new LinkedList<>();

    final byte[] payload = contentToEH.getBytes(Charset.defaultCharset());
    final EventData eventData = EventData.create(payload);
    eventDataList.add(eventData);


    for (int concurrentSends = 0; concurrentSends < NO_OF_CONCURRENT_SENDS; concurrentSends++) {
      if (sendTasks[concurrentSends] == null || sendTasks[concurrentSends].isDone()) {
        sendTasks[concurrentSends] = ehClientPool.send(eventDataList)
            .whenCompleteAsync(new BiConsumer<Void, Throwable>() {
              @Override
              public void accept(Void aVoid, Throwable throwable) {
              //  System.out.println(String.format("result: %s, latency: %s, batchSize %s", throwable == null? "success": "failure",
              //       Duration.between(beforeSend, Instant.now()).toMillis(), BATCH_SIZE));

                if (throwable != null && throwable.getCause() != null) {
                  System.out.println(String.format("%s :send failed with error: %s",
                      Instant.now().toString(),
                      throwable.getCause().getMessage()));
                }
              }
            });
      }
    }
    try {
      CompletableFuture.allOf(sendTasks).get();
      eventDataList.clear();
    } catch (Exception ignore) {

    }
  }
}
