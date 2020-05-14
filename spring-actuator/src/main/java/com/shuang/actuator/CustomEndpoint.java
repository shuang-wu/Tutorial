package com.shuang.actuator;

import org.springframework.boot.actuate.endpoint.annotation.ReadOperation;
import org.springframework.boot.actuate.endpoint.web.annotation.WebEndpoint;
import org.springframework.stereotype.Component;

@Component
@WebEndpoint(id = "customEndpoint")
public class CustomEndpoint {

    @ReadOperation
    public String readOperation() {
        return "Hello";
    }
}
