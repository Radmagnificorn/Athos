package net.radmag.storage;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Created by stephen.brown on 2/1/2017.
 */
public interface SavePanelService {
    String store(MultipartFile file, String chapterPath);

    void delete(String chapterPath, String fileName);
    void delete(String chapterPath, List<String> fileNames);
    void delete(String chapterPath);

    void init();
}
