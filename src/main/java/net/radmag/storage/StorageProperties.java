package net.radmag.storage;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Created by stephen.brown on 1/23/2017.
 */
@ConfigurationProperties("storage")
public class StorageProperties {

    private String storageLocation = "ext-res/pages";

    public String getStorageLocation() {
        return storageLocation;
    }

    public void setStorageLocation(String storageLocation) {
        this.storageLocation = storageLocation;
    }



}
