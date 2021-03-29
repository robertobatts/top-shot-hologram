package com.robertobatts.topshothologramapi.services;

import com.robertobatts.topshothologramapi.domain.TopShotCubeMetadata;
import com.robertobatts.topshothologramapi.domain.TopShotPlayerDetails;
import com.robertobatts.topshothologramapi.repositories.TopShotCubeMetadataRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopShotCubeMetadataService {

    @Autowired
    private TopShotCubeMetadataRepository topShotCubeMetadataRepository;

    public List<List<String>> findMediaIdsPerCube(String playerName, String date, String type) {
        List<TopShotCubeMetadata> topShotCubeMetadataList = topShotCubeMetadataRepository
                .findByPlayerNameAndDateAndType(playerName, date, type);
        return topShotCubeMetadataList.stream().map(TopShotCubeMetadata::getMediaIdsAsString).collect(Collectors.toList());
    }

    public List<TopShotPlayerDetails> findAllPlayers() {
        List<TopShotCubeMetadata> topShotCubeMetadataList = topShotCubeMetadataRepository.findAll();
        return topShotCubeMetadataList.stream().map(this::toTopShotPlayerDetails).collect(Collectors.toList());
    }

    public void insert(String playerName, String date, String type, String borderColor, List<ObjectId> mediaIds) {
        TopShotCubeMetadata topshotCubeMetadata = new TopShotCubeMetadata(
                ObjectId.get(), playerName, date, type, borderColor, mediaIds, LocalDateTime.now(), LocalDateTime.now());
        topShotCubeMetadataRepository.insert(topshotCubeMetadata);
    }

    private TopShotPlayerDetails toTopShotPlayerDetails(TopShotCubeMetadata topShotCubeMetadata) {
        return new TopShotPlayerDetails(topShotCubeMetadata.getPlayerName(), topShotCubeMetadata.getDate(), topShotCubeMetadata.getType());
    }

}
