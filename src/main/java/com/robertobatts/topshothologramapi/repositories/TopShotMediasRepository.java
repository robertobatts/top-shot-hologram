package com.robertobatts.topshothologramapi.repositories;

import com.robertobatts.topshothologramapi.domain.TopShotMedia;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopShotMediasRepository extends MongoRepository<TopShotMedia, ObjectId> {
}
