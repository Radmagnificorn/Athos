package net.radmag.storage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

/**
 * Created by stephen.brown on 2/1/2017.
 */
@Service
public class SavePanelFileSystemService implements SavePanelService {
    private final Path rootLocation;

    @Autowired
    public SavePanelFileSystemService(StorageProperties storage) {
        this.rootLocation = Paths.get(storage.getStorageLocation());
    }

    @Override
    public String store(MultipartFile file, String chapterPath) {

        String fullPath;
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + file.getOriginalFilename());
            }
            fullPath = this.rootLocation.resolve(file.getOriginalFilename()).toString();
            Files.createDirectories(this.rootLocation.resolve(chapterPath));
            Files.copy(file.getInputStream(), this.rootLocation.resolve(chapterPath).resolve(file.getOriginalFilename()));
        } catch (IOException e) {
            throw new StorageException("Failed to store file " + file.getOriginalFilename(), e);
        }

        return fullPath;

    }

    @Override
    public void delete(String chapterPath, String fileName) {
        try {
            Files.delete(rootLocation.resolve(chapterPath).resolve(fileName));
        } catch (IOException e) {
            throw new StorageException(("Could not delete file"), e);
        }
    }

    @Override
    public void delete(String chapterPath, List<String> fileNames) {
        fileNames.forEach(fileName -> delete(chapterPath, fileName));
    }

    @Override
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new StorageException("Could not create storage directory", e);
        }
    }
}
