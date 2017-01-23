package net.radmag.controller;

import net.radmag.model.Chapter;
import net.radmag.repository.ChapterRepository;
import net.radmag.storage.SavePanelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

/**
 * Created by stephen.brown on 1/16/2017.
 */

@RestController
public class ChapterController {

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private SavePanelService savePanelService;

    @RequestMapping(value = "chapters/{id}/upload", method = RequestMethod.POST)
    public String uploadPanel(@PathVariable Long id, @RequestParam("uploadfile") MultipartFile uploadfile) {

        return savePanelService.store(uploadfile);

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
        return ChapterStub.findOne(id);
    }

    @RequestMapping(value = "chapters/{id}", method = RequestMethod.PUT)
    public Chapter update(@PathVariable Long id, @RequestBody Chapter chapter)
    {
        chapter.setId(id);
        return chapterRepository.saveAndFlush(chapter);
    }

    @RequestMapping(value = "chapters/{id}", method = RequestMethod.DELETE)
    public static Chapter delete(@PathVariable Long id){
        return ChapterStub.delete(id);
    }

}
