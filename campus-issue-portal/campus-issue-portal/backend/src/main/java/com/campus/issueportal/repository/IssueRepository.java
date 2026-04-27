package com.campus.issueportal.repository;

import com.campus.issueportal.model.Issue;
import com.campus.issueportal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByReportedBy(User user);
    List<Issue> findByStatus(Issue.Status status);
    List<Issue> findByCategory(Issue.Category category);
    List<Issue> findAllByOrderByCreatedAtDesc();
}
