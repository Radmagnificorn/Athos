package net.radmag;

import net.radmag.storage.StorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by stephen.brown on 1/23/2017.
 */
@Configuration
public class StaticResourceConfiguration extends WebMvcConfigurerAdapter {

    private static final String[] RESOURCE_LOCATIONS = {
            "file:ext-res/",
            "classpath:/resources/",
            "classpath:/static/"
    };

    @Autowired
    private StorageProperties storageProperties;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        super.addResourceHandlers(registry);
        registry.addResourceHandler("/**").addResourceLocations(RESOURCE_LOCATIONS);
    }
}
