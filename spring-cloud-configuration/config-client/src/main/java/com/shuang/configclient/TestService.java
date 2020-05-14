package com.shuang.configclient;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class TestService {

    Logger logger = LoggerFactory.getLogger(TestService.class);

    @Value("${test}")
    private String testProperty;

    @PostConstruct
    private void init() {
        logger.info("Test property value:{}", testProperty);
    }
}
