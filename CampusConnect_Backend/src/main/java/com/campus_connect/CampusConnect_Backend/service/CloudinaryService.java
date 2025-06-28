package com.campus_connect.CampusConnect_Backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadFile(MultipartFile file) throws IOException {
        String contentType = file.getContentType(); // e.g., image/jpeg, application/pdf

        Map uploadResult;

        if (contentType != null && contentType.startsWith("image/")) {
            // Upload as image (for preview, transformation support)
            uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "notes"
                    ));
        } else {
            // Upload as raw for PDFs, DOCX, ZIP, etc.
            uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "resource_type", "raw",
                            "folder", "notes"
                    ));
        }

        return uploadResult.get("secure_url").toString();
    }

    public String deleteFile(String publicId, String contentType) throws IOException {
        String resourceType = contentType != null && contentType.startsWith("image/") ? "image" : "raw";

        Map result = cloudinary.uploader().destroy(publicId,
                ObjectUtils.asMap("resource_type", resourceType));
        return result.get("result").toString();
    }
}
