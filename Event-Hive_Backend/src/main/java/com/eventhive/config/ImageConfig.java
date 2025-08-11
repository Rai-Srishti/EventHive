package com.eventhive.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ImageConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    	registry.addResourceHandler("/uploads/**")
        .addResourceLocations("file:D:/sunbeam/EventHive_project/EventHive/Event-Hive_Backend/uploads");
    	
//        registry.addResourceHandler("/uploads/**")
//                .addResourceLocations("file:E:/Final_EventHive/EventHive/Event-Hive_Backend/uploads");
        
        //srishti
//      registry.addResourceHandler("/uploads/**")
//      .addResourceLocations("file:D:/CDAC/EventHive/Event-Hive_Backend/uploads");
    	
//    	registry.addResourceHandler("/uploads/**")
//      .addResourceLocations("file:C:/Users/Srishti/OneDrive/Desktop/EventHive/Event-Hive_Backend/uploads/");
    	
    }
}
