package com.robertobatts.topshothologramapi.controllers;

import com.robertobatts.topshothologramapi.domain.BorderColor;
import com.robertobatts.topshothologramapi.domain.TopShotCubeMetadata;
import com.robertobatts.topshothologramapi.domain.TopShotPlayerDetails;
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

@RestController
@RequestMapping("/api")
public final class TopShotHologramsController {

    @Autowired
    private TopShotMediaService topShotMediaService;

    @Autowired
    private TopShotCubeMetadataService topShotCubeMetadataService;

    @PostMapping(value = "/upload-top-shot", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadTopShot(@RequestParam MultipartFile[] files, @RequestParam String playerName,
                                        @RequestParam String date, @RequestParam String type,
                                        @RequestParam(required = false) Integer r, @RequestParam(required = false) Integer g,
                                        @RequestParam(required = false) Integer b) throws IOException {
        List<ObjectId> mediaIds = topShotMediaService.insert(files);
        BorderColor borderColor = null;
        if (r !=null && g!= null && b!= null) {
            borderColor = new BorderColor(r, g, b);
        }
        topShotCubeMetadataService.insert(playerName, date, type, borderColor, mediaIds);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/top-shot-photo/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity getTopShotPhoto(@PathVariable String id) {
        byte[] media = topShotMediaService.findMediaAsBytesArray(id);
        return ResponseEntity.ok(media);
    }

    @GetMapping(value = "/top-shot-video/{id}", produces = "video/mp4")
    public ResponseEntity getTopShotVideo(@PathVariable String id) {
        byte[] media = topShotMediaService.findMediaAsBytesArray(id);
        return ResponseEntity.ok(media);
    }

    @GetMapping("/players")
    public ResponseEntity getAllPlayers() {
        List<TopShotPlayerDetails> players = topShotCubeMetadataService.findAllPlayers();
        return ResponseEntity.ok(players);
    }

    @GetMapping(value = "/top-shot-cube-metadata")
    public ResponseEntity getTopShotCubeMetadata(@RequestParam String playerName,
                                                 @RequestParam String date, @RequestParam String type) {
        TopShotCubeMetadata topShotCubeMetadata = topShotCubeMetadataService.findTopShotCubeMetadata(playerName, date, type);
        return ResponseEntity.ok(topShotCubeMetadata);
    }

}
