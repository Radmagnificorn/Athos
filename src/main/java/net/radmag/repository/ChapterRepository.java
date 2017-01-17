package net.radmag.repository;

import net.radmag.model.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by stephen.brown on 1/17/2017.
 */
public interface ChapterRepository extends JpaRepository<Chapter, Long> {
}
