package net.radmag.storage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
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

    public String store(MultipartFile file) {

        String fullPath;
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + file.getOriginalFilename());
            }
            fullPath = this.rootLocation.resolve(file.getOriginalFilename()).toString();
            Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
        } catch (IOException e) {
            throw new StorageException("Failed to store file " + file.getOriginalFilename(), e);
        }

        return fullPath;

    }

    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new StorageException("Could not create storage directory", e);
        }
    }


}
