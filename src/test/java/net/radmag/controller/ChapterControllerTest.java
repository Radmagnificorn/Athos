package net.radmag.controller;


import net.radmag.model.Chapter;
import net.radmag.repository.ChapterRepository;
import net.radmag.storage.SavePanelService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.AdditionalAnswers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 * Created by stephen.brown on 2/1/2017.
 */
public class ChapterControllerTest {

    @InjectMocks
    private ChapterController cc;

    @Mock
    private ChapterRepository chapterRepository;

    @Mock
    private SavePanelService savePanelService;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void update_should_saveUpdatedChapter() {

        Chapter originalChapter = new Chapter() {{
            setId(1L);
            setName("Chapter 1");
            setNextChapter(2L);
            setPreviousChapter(0L);
            setPath("chapter1");
            setPages(Arrays.asList(
                    "panel1.png",
                    "panel2.png",
                    "panel3.png"
            ));
        }};

        Chapter updatedChapter = new Chapter() {{
            setId(1L);
            setName("Chapter 1");
            setNextChapter(2L);
            setPreviousChapter(0L);
            setPath("chapter1");
            setPages(Arrays.asList(
                    "panel1.png",
                    "panel3.png"
            ));
        }};

        when(chapterRepository.findOne(anyLong())).thenReturn(originalChapter);
        when(chapterRepository.saveAndFlush(any(Chapter.class))).thenAnswer(AdditionalAnswers.returnsFirstArg());

        Chapter savedChapter = cc.update(updatedChapter.getId(), updatedChapter);

        assertEquals(savedChapter, updatedChapter);

    }

    @Test
    public void diffRemoved_should_returnItemsNotInSecondList() {
        List<String> original = Arrays.asList("Chapter1", "Chapter2", "Chapter3", "Chapter4", "Chapter5");
        List<String> updated = Arrays.asList("Chapter1", "Chapter3", "Chapter5");
        List<String> expectedDiff = Arrays.asList("Chapter2", "Chapter4");

        List<String> diffedList = ChapterController.diffRemoved(original, updated);

        assertEquals(diffedList, expectedDiff);
    }

}
