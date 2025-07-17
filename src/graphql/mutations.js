/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAcademicYear = /* GraphQL */ `
  mutation CreateAcademicYear(
    $input: CreateAcademicYearInput!
    $condition: ModelAcademicYearConditionInput
  ) {
    createAcademicYear(input: $input, condition: $condition) {
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
export const updateAcademicYear = /* GraphQL */ `
  mutation UpdateAcademicYear(
    $input: UpdateAcademicYearInput!
    $condition: ModelAcademicYearConditionInput
  ) {
    updateAcademicYear(input: $input, condition: $condition) {
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
export const deleteAcademicYear = /* GraphQL */ `
  mutation DeleteAcademicYear(
    $input: DeleteAcademicYearInput!
    $condition: ModelAcademicYearConditionInput
  ) {
    deleteAcademicYear(input: $input, condition: $condition) {
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
export const createMentor = /* GraphQL */ `
  mutation CreateMentor(
    $input: CreateMentorInput!
    $condition: ModelMentorConditionInput
  ) {
    createMentor(input: $input, condition: $condition) {
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
export const updateMentor = /* GraphQL */ `
  mutation UpdateMentor(
    $input: UpdateMentorInput!
    $condition: ModelMentorConditionInput
  ) {
    updateMentor(input: $input, condition: $condition) {
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
export const deleteMentor = /* GraphQL */ `
  mutation DeleteMentor(
    $input: DeleteMentorInput!
    $condition: ModelMentorConditionInput
  ) {
    deleteMentor(input: $input, condition: $condition) {
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
export const createMentee = /* GraphQL */ `
  mutation CreateMentee(
    $input: CreateMenteeInput!
    $condition: ModelMenteeConditionInput
  ) {
    createMentee(input: $input, condition: $condition) {
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
export const updateMentee = /* GraphQL */ `
  mutation UpdateMentee(
    $input: UpdateMenteeInput!
    $condition: ModelMenteeConditionInput
  ) {
    updateMentee(input: $input, condition: $condition) {
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
export const deleteMentee = /* GraphQL */ `
  mutation DeleteMentee(
    $input: DeleteMenteeInput!
    $condition: ModelMenteeConditionInput
  ) {
    deleteMentee(input: $input, condition: $condition) {
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
export const createMentorMenteeMatch = /* GraphQL */ `
  mutation CreateMentorMenteeMatch(
    $input: CreateMentorMenteeMatchInput!
    $condition: ModelMentorMenteeMatchConditionInput
  ) {
    createMentorMenteeMatch(input: $input, condition: $condition) {
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
export const updateMentorMenteeMatch = /* GraphQL */ `
  mutation UpdateMentorMenteeMatch(
    $input: UpdateMentorMenteeMatchInput!
    $condition: ModelMentorMenteeMatchConditionInput
  ) {
    updateMentorMenteeMatch(input: $input, condition: $condition) {
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
export const deleteMentorMenteeMatch = /* GraphQL */ `
  mutation DeleteMentorMenteeMatch(
    $input: DeleteMentorMenteeMatchInput!
    $condition: ModelMentorMenteeMatchConditionInput
  ) {
    deleteMentorMenteeMatch(input: $input, condition: $condition) {
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
export const createCommunication = /* GraphQL */ `
  mutation CreateCommunication(
    $input: CreateCommunicationInput!
    $condition: ModelCommunicationConditionInput
  ) {
    createCommunication(input: $input, condition: $condition) {
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
export const updateCommunication = /* GraphQL */ `
  mutation UpdateCommunication(
    $input: UpdateCommunicationInput!
    $condition: ModelCommunicationConditionInput
  ) {
    updateCommunication(input: $input, condition: $condition) {
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
export const deleteCommunication = /* GraphQL */ `
  mutation DeleteCommunication(
    $input: DeleteCommunicationInput!
    $condition: ModelCommunicationConditionInput
  ) {
    deleteCommunication(input: $input, condition: $condition) {
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
