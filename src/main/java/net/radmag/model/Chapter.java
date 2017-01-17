package net.radmag.model;

import javax.persistence.*;
import java.util.List;


@Entity
public class Chapter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String path;
    @ElementCollection
    private List<String> pages;
    private Long nextChapter;
    private Long previousChapter;

    public Chapter() {}

    public Chapter(Long id, String name, String path, Long previousChapter, Long nextChapter, List<String> pages) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.pages = pages;
        this.nextChapter = nextChapter;
        this.previousChapter = previousChapter;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public List<String> getPages() {
        return pages;
    }

    public void setPages(List<String> pages) {
        this.pages = pages;
    }

    public Long getNextChapter() {
        return nextChapter;
    }

    public void setNextChapter(Long nextChapter) {
        this.nextChapter = nextChapter;
    }

    public Long getPreviousChapter() {
        return previousChapter;
    }

    public void setPreviousChapter(Long previousChapter) {
        this.previousChapter = previousChapter;
    }

}
