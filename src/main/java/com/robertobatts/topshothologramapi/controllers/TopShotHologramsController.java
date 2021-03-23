package com.robertobatts.topshothologramapi.controllers;

import com.robertobatts.topshothologramapi.services.TopShotMediaService;
import org.apache.commons.io.IOUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api")
public final class TopShotHologramsController {

    @Autowired
    private TopShotMediaService topShotMediaService;


    @PostMapping(value = "/upload-top-shot", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadTopShot(@RequestParam MultipartFile[] files, @RequestParam String playerName) throws IOException {
        //TODO
        List<ObjectId> ids = topShotMediaService.upload(files);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/top-shot-photo/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity getTopShotPhoto(@PathVariable String id) throws IOException {
        //TODO
        byte[] media = topShotMediaService.getMediaAsBytesArray(id);
        return ResponseEntity.ok(media);
    }

    @GetMapping(value = "/top-shot-video/{id}", produces = "video/mp4")
    public ResponseEntity getTopShotVideo(@PathVariable String id) throws IOException {
        //TODO
        byte[] media = topShotMediaService.getMediaAsBytesArray(id);
        return ResponseEntity.ok(media);
    }

    @GetMapping("/get-all-players")
    public ResponseEntity getAllPlayers() {
        //TODO
        return ResponseEntity.ok().build();
    }

}
