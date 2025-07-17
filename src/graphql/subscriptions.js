/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAcademicYear = /* GraphQL */ `
  subscription OnCreateAcademicYear(
    $filter: ModelSubscriptionAcademicYearFilterInput
  ) {
    onCreateAcademicYear(filter: $filter) {
      id
      yearLabel
      startDate
      endDate
      isActive
      matches {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAcademicYear = /* GraphQL */ `
  subscription OnUpdateAcademicYear(
    $filter: ModelSubscriptionAcademicYearFilterInput
  ) {
    onUpdateAcademicYear(filter: $filter) {
      id
      yearLabel
      startDate
      endDate
      isActive
      matches {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAcademicYear = /* GraphQL */ `
  subscription OnDeleteAcademicYear(
    $filter: ModelSubscriptionAcademicYearFilterInput
  ) {
    onDeleteAcademicYear(filter: $filter) {
      id
      yearLabel
      startDate
      endDate
      isActive
      matches {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMentor = /* GraphQL */ `
  subscription OnCreateMentor($filter: ModelSubscriptionMentorFilterInput) {
    onCreateMentor(filter: $filter) {
      id
      firstName
      lastName
      email
      phone
      occupation
      company
      expertise
      availability
      preferredCommunication
      maxMentees
      status
      bio
      linkedinProfile
      yearsOfExperience
      mentoringSince
      matches {
        nextToken
        __typename
      }
      communications {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMentor = /* GraphQL */ `
  subscription OnUpdateMentor($filter: ModelSubscriptionMentorFilterInput) {
    onUpdateMentor(filter: $filter) {
      id
      firstName
      lastName
      email
      phone
      occupation
      company
      expertise
      availability
      preferredCommunication
      maxMentees
      status
      bio
      linkedinProfile
      yearsOfExperience
      mentoringSince
      matches {
        nextToken
        __typename
      }
      communications {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMentor = /* GraphQL */ `
  subscription OnDeleteMentor($filter: ModelSubscriptionMentorFilterInput) {
    onDeleteMentor(filter: $filter) {
      id
      firstName
      lastName
      email
      phone
      occupation
      company
      expertise
      availability
      preferredCommunication
      maxMentees
      status
      bio
      linkedinProfile
      yearsOfExperience
      mentoringSince
      matches {
        nextToken
        __typename
      }
      communications {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMentee = /* GraphQL */ `
  subscription OnCreateMentee($filter: ModelSubscriptionMenteeFilterInput) {
    onCreateMentee(filter: $filter) {
      id
      firstName
      lastName
      email
      phone
      gradeLevel
      school
      interests
      goals
      availability
      preferredCommunication
      parentEmail
      parentPhone
      status
      specialNeeds
      previousMentoring
      enrollmentDate
      matches {
        nextToken
        __typename
      }
      communications {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMentee = /* GraphQL */ `
  subscription OnUpdateMentee($filter: ModelSubscriptionMenteeFilterInput) {
    onUpdateMentee(filter: $filter) {
      id
      firstName
      lastName
      email
      phone
      gradeLevel
      school
      interests
      goals
      availability
      preferredCommunication
      parentEmail
      parentPhone
      status
      specialNeeds
      previousMentoring
      enrollmentDate
      matches {
        nextToken
        __typename
      }
      communications {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMentee = /* GraphQL */ `
  subscription OnDeleteMentee($filter: ModelSubscriptionMenteeFilterInput) {
    onDeleteMentee(filter: $filter) {
      id
      firstName
      lastName
      email
      phone
      gradeLevel
      school
      interests
      goals
      availability
      preferredCommunication
      parentEmail
      parentPhone
      status
      specialNeeds
      previousMentoring
      enrollmentDate
      matches {
        nextToken
        __typename
      }
      communications {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMentorMenteeMatch = /* GraphQL */ `
  subscription OnCreateMentorMenteeMatch(
    $filter: ModelSubscriptionMentorMenteeMatchFilterInput
  ) {
    onCreateMentorMenteeMatch(filter: $filter) {
      id
      mentorID
      menteeID
      academicYearID
      mentor {
        id
        firstName
        lastName
        email
        phone
        occupation
        company
        expertise
        availability
        preferredCommunication
        maxMentees
        status
        bio
        linkedinProfile
        yearsOfExperience
        mentoringSince
        createdAt
        updatedAt
        __typename
      }
      mentee {
        id
        firstName
        lastName
        email
        phone
        gradeLevel
        school
        interests
        goals
        availability
        preferredCommunication
        parentEmail
        parentPhone
        status
        specialNeeds
        previousMentoring
        enrollmentDate
        createdAt
        updatedAt
        __typename
      }
      academicYear {
        id
        yearLabel
        startDate
        endDate
        isActive
        createdAt
        updatedAt
        __typename
      }
      matchDate
      status
      matchingCriteria
      goals
      meetingFrequency
      lastContactDate
      notes
      communications {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMentorMenteeMatch = /* GraphQL */ `
  subscription OnUpdateMentorMenteeMatch(
    $filter: ModelSubscriptionMentorMenteeMatchFilterInput
  ) {
    onUpdateMentorMenteeMatch(filter: $filter) {
      id
      mentorID
      menteeID
      academicYearID
      mentor {
        id
        firstName
        lastName
        email
        phone
        occupation
        company
        expertise
        availability
        preferredCommunication
        maxMentees
        status
        bio
        linkedinProfile
        yearsOfExperience
        mentoringSince
        createdAt
        updatedAt
        __typename
      }
      mentee {
        id
        firstName
        lastName
        email
        phone
        gradeLevel
        school
        interests
        goals
        availability
        preferredCommunication
        parentEmail
        parentPhone
        status
        specialNeeds
        previousMentoring
        enrollmentDate
        createdAt
        updatedAt
        __typename
      }
      academicYear {
        id
        yearLabel
        startDate
        endDate
        isActive
        createdAt
        updatedAt
        __typename
      }
      matchDate
      status
      matchingCriteria
      goals
      meetingFrequency
      lastContactDate
      notes
      communications {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMentorMenteeMatch = /* GraphQL */ `
  subscription OnDeleteMentorMenteeMatch(
    $filter: ModelSubscriptionMentorMenteeMatchFilterInput
  ) {
    onDeleteMentorMenteeMatch(filter: $filter) {
      id
      mentorID
      menteeID
      academicYearID
      mentor {
        id
        firstName
        lastName
        email
        phone
        occupation
        company
        expertise
        availability
        preferredCommunication
        maxMentees
        status
        bio
        linkedinProfile
        yearsOfExperience
        mentoringSince
        createdAt
        updatedAt
        __typename
      }
      mentee {
        id
        firstName
        lastName
        email
        phone
        gradeLevel
        school
        interests
        goals
        availability
        preferredCommunication
        parentEmail
        parentPhone
        status
        specialNeeds
        previousMentoring
        enrollmentDate
        createdAt
        updatedAt
        __typename
      }
      academicYear {
        id
        yearLabel
        startDate
        endDate
        isActive
        createdAt
        updatedAt
        __typename
      }
      matchDate
      status
      matchingCriteria
      goals
      meetingFrequency
      lastContactDate
      notes
      communications {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCommunication = /* GraphQL */ `
  subscription OnCreateCommunication(
    $filter: ModelSubscriptionCommunicationFilterInput
  ) {
    onCreateCommunication(filter: $filter) {
      id
      matchID
      mentorID
      menteeID
      match {
        id
        mentorID
        menteeID
        academicYearID
        matchDate
        status
        matchingCriteria
        goals
        meetingFrequency
        lastContactDate
        notes
        createdAt
        updatedAt
        __typename
      }
      mentor {
        id
        firstName
        lastName
        email
        phone
        occupation
        company
        expertise
        availability
        preferredCommunication
        maxMentees
        status
        bio
        linkedinProfile
        yearsOfExperience
        mentoringSince
        createdAt
        updatedAt
        __typename
      }
      mentee {
        id
        firstName
        lastName
        email
        phone
        gradeLevel
        school
        interests
        goals
        availability
        preferredCommunication
        parentEmail
        parentPhone
        status
        specialNeeds
        previousMentoring
        enrollmentDate
        createdAt
        updatedAt
        __typename
      }
      type
      subject
      content
      communicationDate
      initiatedBy
      responseRequired
      responseDate
      tags
      attachments
      isRead
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCommunication = /* GraphQL */ `
  subscription OnUpdateCommunication(
    $filter: ModelSubscriptionCommunicationFilterInput
  ) {
    onUpdateCommunication(filter: $filter) {
      id
      matchID
      mentorID
      menteeID
      match {
        id
        mentorID
        menteeID
        academicYearID
        matchDate
        status
        matchingCriteria
        goals
        meetingFrequency
        lastContactDate
        notes
        createdAt
        updatedAt
        __typename
      }
      mentor {
        id
        firstName
        lastName
        email
        phone
        occupation
        company
        expertise
        availability
        preferredCommunication
        maxMentees
        status
        bio
        linkedinProfile
        yearsOfExperience
        mentoringSince
        createdAt
        updatedAt
        __typename
      }
      mentee {
        id
        firstName
        lastName
        email
        phone
        gradeLevel
        school
        interests
        goals
        availability
        preferredCommunication
        parentEmail
        parentPhone
        status
        specialNeeds
        previousMentoring
        enrollmentDate
        createdAt
        updatedAt
        __typename
      }
      type
      subject
      content
      communicationDate
      initiatedBy
      responseRequired
      responseDate
      tags
      attachments
      isRead
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCommunication = /* GraphQL */ `
  subscription OnDeleteCommunication(
    $filter: ModelSubscriptionCommunicationFilterInput
  ) {
    onDeleteCommunication(filter: $filter) {
      id
      matchID
      mentorID
      menteeID
      match {
        id
        mentorID
        menteeID
        academicYearID
        matchDate
        status
        matchingCriteria
        goals
        meetingFrequency
        lastContactDate
        notes
        createdAt
        updatedAt
        __typename
      }
      mentor {
        id
        firstName
        lastName
        email
        phone
        occupation
        company
        expertise
        availability
        preferredCommunication
        maxMentees
        status
        bio
        linkedinProfile
        yearsOfExperience
        mentoringSince
        createdAt
        updatedAt
        __typename
      }
      mentee {
        id
        firstName
        lastName
        email
        phone
        gradeLevel
        school
        interests
        goals
        availability
        preferredCommunication
        parentEmail
        parentPhone
        status
        specialNeeds
        previousMentoring
        enrollmentDate
        createdAt
        updatedAt
        __typename
      }
      type
      subject
      content
      communicationDate
      initiatedBy
      responseRequired
      responseDate
      tags
      attachments
      isRead
      createdAt
      updatedAt
      __typename
    }
  }
`;
