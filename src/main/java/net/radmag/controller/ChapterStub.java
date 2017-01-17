package net.radmag.controller;

import net.radmag.model.Chapter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by stephen.brown on 1/16/2017.
 */
public class ChapterStub {
    private static Map<Long, Chapter> chapters = new HashMap<Long, Chapter>();
    private static Long idIndex = 3L;

    static {
        Chapter ch1 = new Chapter(1L, "Chapter 1", "/Chapter1", null, 2L, new ArrayList<String>() {{
            add("page1.png");
            add("page2.png");
            add("page3.mp4");
        }});
        chapters.put(1L, ch1);
        Chapter ch2 = new Chapter(1L, "Chapter 2", "/Chapter2", 1L, 3L, new ArrayList<String>() {{
            add("page1.png");
            add("page2.png");
            add("page3.mp4");
        }});
        chapters.put(2L, ch2);
        Chapter ch3 = new Chapter(3L, "Chapter 3", "/Chapter3", 2L, 1L, new ArrayList<String>() {{
            add("page1.png");
            add("page2.png");
            add("page3.mp4");
        }});
        chapters.put(3L, ch3);
    }

    public static Chapter create(Chapter chapter) {
        idIndex ++;
        return chapters.put(idIndex, chapter);
    }

    public static List<Chapter> findAll() {
        return new ArrayList(chapters.values());
    }

    public static Chapter findOne(Long id) {
        return chapters.get(id);
    }

    public static Chapter delete(Long id) {
        return chapters.remove(id);
    }

    public static Chapter update(Long id, Chapter chapter) {
        return chapters.put(id, chapter);
    }


}
