package com.robertobatts.topshothologramapi.services;

import com.robertobatts.topshothologramapi.domain.TopShotCubeMetadata;
import com.robertobatts.topshothologramapi.repositories.TopShotCubeMetadataRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TopShotCubeMetadataService {

    @Autowired
    private TopShotCubeMetadataRepository topShotCubeMetadataRepository;

    public List<TopShotCubeMetadata> findByPlayerName(String playerName) {
        return topShotCubeMetadataRepository.findByPlayerName(playerName);
    }

    public List<List<String>> findMediaIdsPerCube(String playerName) {
        List<TopShotCubeMetadata> topShotCubeMetadataList = findByPlayerName(playerName);
        return  topShotCubeMetadataList.stream().map(TopShotCubeMetadata::getMediaIdsAsString).collect(Collectors.toList());
    }

    public Set<String> findAllPlayerNames() {
        List<TopShotCubeMetadata> topShotCubeMetadataList = topShotCubeMetadataRepository.findAll();
        return topShotCubeMetadataList.stream().map(TopShotCubeMetadata::getPlayerName).collect(Collectors.toSet());
    }

    public void insert(String playerName, List<ObjectId> mediaIds) {
        TopShotCubeMetadata topshotCubeMetadata = new TopShotCubeMetadata(
                ObjectId.get(), playerName, mediaIds, LocalDateTime.now(), LocalDateTime.now());
        topShotCubeMetadataRepository.insert(topshotCubeMetadata);
    }
}
