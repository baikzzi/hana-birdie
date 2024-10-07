package com.kopo.hanabirdie.global.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Hana Golf",
                version = "v1.0.0",
                description = "This is a hana API documentation"
        )
)
public class OpenApiConfig {
}