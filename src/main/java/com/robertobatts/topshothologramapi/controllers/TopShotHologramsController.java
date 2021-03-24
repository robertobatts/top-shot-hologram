package com.robertobatts.topshothologramapi.controllers;

import com.robertobatts.topshothologramapi.services.TopShotCubeMetadataService;
import com.robertobatts.topshothologramapi.services.TopShotMediaService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public final class TopShotHologramsController {

    @Autowired
    private TopShotMediaService topShotMediaService;

    @Autowired
    private TopShotCubeMetadataService topShotCubeMetadataService;


    @PostMapping(value = "/upload-top-shot", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadTopShot(@RequestParam MultipartFile[] files, @RequestParam String playerName) throws IOException {
        List<ObjectId> mediaIds = topShotMediaService.insert(files);
        topShotCubeMetadataService.insert(playerName, mediaIds);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/top-shot-photo/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity getTopShotPhoto(@PathVariable String id) throws IOException {
        byte[] media = topShotMediaService.findMediaAsBytesArray(id);
        return ResponseEntity.ok(media);
    }

    @GetMapping(value = "/top-shot-video/{id}", produces = "video/mp4")
    public ResponseEntity getTopShotVideo(@PathVariable String id) throws IOException {
        byte[] media = topShotMediaService.findMediaAsBytesArray(id);
        return ResponseEntity.ok(media);
    }

    @GetMapping("/get-all-players")
    public ResponseEntity getAllPlayers() {
        Set<String> playerNames = topShotCubeMetadataService.findAllPlayerNames();
        return ResponseEntity.ok(playerNames);
    }

    @GetMapping(value = "/top-shot-cube-metadata")
    public ResponseEntity getTopShotCubeMetadata(@RequestParam String playerName) throws IOException {
        List<List<String>> cubesMediasIds = topShotCubeMetadataService.findMediaIdsPerCube(playerName);
        return ResponseEntity.ok(cubesMediasIds);
    }

}
