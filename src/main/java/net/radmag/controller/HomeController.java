package net.radmag.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by stephen.brown on 1/16/2017.
 */

@RestController
public class HomeController {

    @RequestMapping("/")
    public String home () {
        return "application home";
    }
}
