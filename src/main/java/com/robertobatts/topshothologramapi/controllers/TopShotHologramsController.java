package com.robertobatts.topshothologramapi.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public final class TopShotHologramsController {


    @PostMapping("/upload-top-shot")
    public ResponseEntity uploadTopShot() {
        //TODO
        return ResponseEntity.ok().build();
    }

    @GetMapping("/get-top-shot")
    public ResponseEntity getTopShot() {
        //TODO
        return ResponseEntity.ok().build();
    }

    @GetMapping("/get-all-players")
    public ResponseEntity getAllPlayers() {
        //TODO
        return ResponseEntity.ok().build();
    }

}
