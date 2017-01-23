package net.radmag.storage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Created by stephen.brown on 1/23/2017.
 */
@Service
public class SavePanelService {

    private final Path rootLocation;

    @Autowired
    public SavePanelService(StorageProperties storage) {
        this.rootLocation = Paths.get(storage.getStorageLocation());
    }

    public void init() {

    }


}
