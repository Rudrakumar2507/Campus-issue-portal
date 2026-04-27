package com.campus.issueportal.controller;

import com.campus.issueportal.model.Issue;
import com.campus.issueportal.model.User;
import com.campus.issueportal.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired private IssueRepository issueRepository;

    // Student: Submit a new issue
    @PostMapping
    public ResponseEntity<?> createIssue(@RequestBody Map<String, String> body,
                                          @AuthenticationPrincipal User currentUser) {
        Issue issue = new Issue();
        issue.setTitle(body.get("title"));
        issue.setDescription(body.get("description"));
        issue.setCategory(Issue.Category.valueOf(body.get("category")));
        issue.setReportedBy(currentUser);
        issueRepository.save(issue);
        return ResponseEntity.ok(Map.of("message", "Issue submitted successfully", "id", issue.getId()));
    }

    // Student: Get my own issues
    @GetMapping("/my")
    public ResponseEntity<List<Issue>> getMyIssues(@AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(issueRepository.findByReportedBy(currentUser));
    }

    // Admin: Get all issues
    @GetMapping
    public ResponseEntity<List<Issue>> getAllIssues() {
        return ResponseEntity.ok(issueRepository.findAllByOrderByCreatedAtDesc());
    }

    // Admin: Update issue status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id,
                                           @RequestBody Map<String, String> body) {
        return issueRepository.findById(id).map(issue -> {
            issue.setStatus(Issue.Status.valueOf(body.get("status")));
            issueRepository.save(issue);
            return ResponseEntity.ok(Map.of("message", "Status updated"));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Admin: Get issue by ID
    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long id) {
        return issueRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
