package com.shuang.actuator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
public class CustomHealthIndicator implements HealthIndicator {

    Logger logger = LoggerFactory.getLogger(CustomHealthIndicator.class);

    @Override
    public Health health() {
        int errorCode = check();
        if (errorCode != 0) {
            HashMap<String,String > map = new HashMap<>();
            map.put("Reason 1","ok");
            return Health.down().withDetails(map).withDetail("Error Code", errorCode).build();
        }
        return Health.up().build();
    }

    /**
     * Perform some specific health check
     *
     * @return
     */
    private int check() {
        //Custom logic to validate app health here, return 0 CODE as no problem found.
        //...
        logger.info("Doing health check ...");
        return 1;
    }

}
