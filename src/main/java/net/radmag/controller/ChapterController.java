package net.radmag.controller;

import com.sun.xml.internal.bind.v2.TODO;
import net.radmag.model.Chapter;
import net.radmag.repository.ChapterRepository;
import net.radmag.storage.SavePanelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by stephen.brown on 1/16/2017.
 */

@RestController
public class ChapterController {

    private final ChapterRepository chapterRepository;

    private final SavePanelService savePanelService;

    @Autowired
    public ChapterController(ChapterRepository chapterRepository, SavePanelService savePanelService) {
        this.chapterRepository = chapterRepository;
        this.savePanelService = savePanelService;
    }

    @RequestMapping(value = "chapters/{id}/new_page", method = RequestMethod.POST)
    public String uploadPanel(@PathVariable Long id, @RequestParam("uploadfile") MultipartFile uploadfile) {
        Chapter chapter = chapterRepository.findOne(id);
        chapter.getPages().add(uploadfile.getOriginalFilename());
        chapterRepository.saveAndFlush(chapter);
        return savePanelService.store(uploadfile, chapter.getPath());

    }

    @RequestMapping(value = "chapters", method = RequestMethod.GET)
    public List<Chapter> list() {
        return chapterRepository.findAll();
    }

    @RequestMapping(value = "chapters", method = RequestMethod.POST)
    public Chapter create(@RequestBody Chapter chapter) {
        return chapterRepository.saveAndFlush(chapter);
    }

    @RequestMapping(value = "chapters/{id}", method = RequestMethod.GET)
    public Chapter get(@PathVariable Long id) {
        return chapterRepository.findOne(id);
    }

    @RequestMapping(value = "chapters/{id}", method = RequestMethod.PUT)
    public Chapter update(@PathVariable Long id, @RequestBody Chapter chapter)
    {
        Chapter origChapter = chapterRepository.findOne(id);
        chapter.setId(id);

        //TODO: handle changing path

        savePanelService.delete(origChapter.getPath(), diffRemoved(origChapter.getPages(), chapter.getPages()));
        return chapterRepository.saveAndFlush(chapter);
    }

    @RequestMapping(value = "chapters/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        chapterRepository.delete(id);
    }

    protected static List<String> diffRemoved(List<String> original, List<String> updated) {
        List<String> removed = new ArrayList<>(original);
        removed.removeAll(updated);
        return removed;
    }

}
