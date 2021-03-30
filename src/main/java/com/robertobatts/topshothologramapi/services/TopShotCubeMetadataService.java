package com.robertobatts.topshothologramapi.services;

import com.robertobatts.topshothologramapi.domain.BorderColor;
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

    public TopShotCubeMetadata findTopShotCubeMetadata(String playerName, String date, String type) {
        return topShotCubeMetadataRepository.findByPlayerNameAndDateAndType(playerName, date, type);
    }

    public List<TopShotPlayerDetails> findAllPlayers() {
        List<TopShotCubeMetadata> topShotCubeMetadataList = topShotCubeMetadataRepository.findAll();
        return topShotCubeMetadataList.stream().map(this::toTopShotPlayerDetails).collect(Collectors.toList());
    }

    public void insert(String playerName, String date, String type, BorderColor borderColor, List<ObjectId> mediaIds) {
        TopShotCubeMetadata topshotCubeMetadata = new TopShotCubeMetadata(
                ObjectId.get(), playerName, date, type, borderColor, mediaIds, LocalDateTime.now(), LocalDateTime.now());
        topShotCubeMetadataRepository.insert(topshotCubeMetadata);
    }

    private TopShotPlayerDetails toTopShotPlayerDetails(TopShotCubeMetadata topShotCubeMetadata) {
        return new TopShotPlayerDetails(topShotCubeMetadata.getPlayerName(), topShotCubeMetadata.getDate(), topShotCubeMetadata.getType());
    }

}
