/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAcademicYear = /* GraphQL */ `
  query GetAcademicYear($id: ID!) {
    getAcademicYear(id: $id) {
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
export const listAcademicYears = /* GraphQL */ `
  query ListAcademicYears(
    $filter: ModelAcademicYearFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAcademicYears(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        yearLabel
        startDate
        endDate
        isActive
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMentor = /* GraphQL */ `
  query GetMentor($id: ID!) {
    getMentor(id: $id) {
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
export const listMentors = /* GraphQL */ `
  query ListMentors(
    $filter: ModelMentorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMentors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getMentee = /* GraphQL */ `
  query GetMentee($id: ID!) {
    getMentee(id: $id) {
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
export const listMentees = /* GraphQL */ `
  query ListMentees(
    $filter: ModelMenteeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMentees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getMentorMenteeMatch = /* GraphQL */ `
  query GetMentorMenteeMatch($id: ID!) {
    getMentorMenteeMatch(id: $id) {
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
export const listMentorMenteeMatches = /* GraphQL */ `
  query ListMentorMenteeMatches(
    $filter: ModelMentorMenteeMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMentorMenteeMatches(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getCommunication = /* GraphQL */ `
  query GetCommunication($id: ID!) {
    getCommunication(id: $id) {
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
export const listCommunications = /* GraphQL */ `
  query ListCommunications(
    $filter: ModelCommunicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommunications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        matchID
        mentorID
        menteeID
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
      nextToken
      __typename
    }
  }
`;
export const mentorsByEmail = /* GraphQL */ `
  query MentorsByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelMentorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    mentorsByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const menteesByEmail = /* GraphQL */ `
  query MenteesByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelMenteeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    menteesByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const mentorMenteeMatchesByMentorID = /* GraphQL */ `
  query MentorMenteeMatchesByMentorID(
    $mentorID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMentorMenteeMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    mentorMenteeMatchesByMentorID(
      mentorID: $mentorID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const mentorMenteeMatchesByMenteeID = /* GraphQL */ `
  query MentorMenteeMatchesByMenteeID(
    $menteeID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMentorMenteeMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    mentorMenteeMatchesByMenteeID(
      menteeID: $menteeID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const mentorMenteeMatchesByAcademicYearID = /* GraphQL */ `
  query MentorMenteeMatchesByAcademicYearID(
    $academicYearID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMentorMenteeMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    mentorMenteeMatchesByAcademicYearID(
      academicYearID: $academicYearID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const communicationsByMatchID = /* GraphQL */ `
  query CommunicationsByMatchID(
    $matchID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommunicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    communicationsByMatchID(
      matchID: $matchID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        matchID
        mentorID
        menteeID
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
      nextToken
      __typename
    }
  }
`;
export const communicationsByMentorID = /* GraphQL */ `
  query CommunicationsByMentorID(
    $mentorID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommunicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    communicationsByMentorID(
      mentorID: $mentorID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        matchID
        mentorID
        menteeID
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
      nextToken
      __typename
    }
  }
`;
export const communicationsByMenteeID = /* GraphQL */ `
  query CommunicationsByMenteeID(
    $menteeID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommunicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    communicationsByMenteeID(
      menteeID: $menteeID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        matchID
        mentorID
        menteeID
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
      nextToken
      __typename
    }
  }
`;
