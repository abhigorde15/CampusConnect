package com.campus_connect.CampusConnect_Backend.controllers;

import com.campus_connect.CampusConnect_Backend.config.JwtUtil;
import com.campus_connect.CampusConnect_Backend.models.Note;
import com.campus_connect.CampusConnect_Backend.models.User;
import com.campus_connect.CampusConnect_Backend.repository.UserRepository;
import com.campus_connect.CampusConnect_Backend.service.CloudinaryService;
import com.campus_connect.CampusConnect_Backend.service.NotesService;

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "https://campus-connect-amber-nine.vercel.app/")
@RequestMapping("/api")
public class NotesController {

    @Autowired
    private NotesService noteService;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
  
    @GetMapping("/auth/notes")
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }

    @PostMapping("/notes/upload")
    public Note uploadNote(
            @RequestParam("title") String title,
            @RequestParam("branch") String branch,
            @RequestParam("semester") String semester,
            @RequestParam("file") MultipartFile file,
            HttpServletRequest request
    ) throws IOException, java.io.IOException
    {
       
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        User user = userRepository.findByEmail(email).orElseThrow();
        System.out.println("User.........."+user);
        String fileUrl  = null;
    //try {
    	 fileUrl ="https://res.cloudinary.com/dguygzrkp/image/upload/v1751135815/notes/yxumfpbtkjmmflga2g3z.png";    // cloudinaryService.uploadFile(file);
//    }
//   catch(java.io.IOException exception) {
//   	throw new java.io.IOException("Cloudinary Setup Exception"+exception);
//    }
        

        Note note = new Note();
        note.setTitle(title);
        note.setBranch(branch);
        note.setSemester(semester);
        note.setUploadedAt(LocalDateTime.now());
        note.setFileUrl(fileUrl);
        note.setUploadedBy(user);

        return noteService.saveNote(note);
    }


    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable int id) {
        noteService.deleteNote(id);
    }

    // 🔹 Get notes by a specific user
    @GetMapping("/notes/user/{userId}")
    public List<Note> getNotesByUser(@PathVariable int userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return noteService.getNotesByUser(user);
    }
}
