package com.robertobatts.topshothologramapi.repositories;

import com.robertobatts.topshothologramapi.domain.TopShotCubeMetadata;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopShotCubeMetadataRepository extends MongoRepository<TopShotCubeMetadata, ObjectId> {

    TopShotCubeMetadata findByPlayerNameAndDateAndType(String playerName, String date, String type);
}
