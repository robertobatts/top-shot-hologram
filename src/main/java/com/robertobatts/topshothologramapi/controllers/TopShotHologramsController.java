package com.robertobatts.topshothologramapi.controllers;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/api")
public final class TopShotHologramsController {


    @PostMapping(value = "/upload-top-shot", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadTopShot(@RequestParam MultipartFile[] files, @RequestParam String playerName, ModelMap modelMap) {
        //TODO
        modelMap.addAttribute("files", files);
        modelMap.addAttribute("playerName", playerName);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/get-top-shot-photo", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity getTopShotPhoto() throws IOException {
        //TODO pass byte stream from db to response
        InputStream in = new ClassPathResource("Capture.PNG").getInputStream();
        byte[] media = IOUtils.toByteArray(in);
        return ResponseEntity.ok(media);
    }

    @GetMapping(value = "/get-top-shot-video", produces = "video/mp4")
    public ResponseEntity getTopShotVideo() throws IOException {
        //TODO
        InputStream in = new ClassPathResource("VIDEO.mp4").getInputStream();
        byte[] media = IOUtils.toByteArray(in);
        return ResponseEntity.ok(media);
    }

    @GetMapping("/get-all-players")
    public ResponseEntity getAllPlayers() {
        //TODO
        return ResponseEntity.ok().build();
    }

}
