// src/services/graphqlService.js
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

const client = generateClient();

// Academic Years
export const getAcademicYears = async () => {
  try {
    const result = await client.graphql({
      query: queries.listAcademicYears,
      variables: {
        limit: 100,
        sortDirection: 'DESC'
      }
    });
    return result.data.listAcademicYears.items;
  } catch (error) {
    console.error('Error fetching academic years:', error);
    throw error;
  }
};

export const getActiveAcademicYear = async () => {
  try {
    const result = await client.graphql({
      query: queries.listAcademicYears,
      variables: {
        filter: { isActive: { eq: true } },
        limit: 1
      }
    });
    return result.data.listAcademicYears.items[0];
  } catch (error) {
    console.error('Error fetching active academic year:', error);
    throw error;
  }
};

export const createAcademicYear = async (yearData) => {
  try {
    const result = await client.graphql({
      query: mutations.createAcademicYear,
      variables: { input: yearData }
    });
    return result.data.createAcademicYear;
  } catch (error) {
    console.error('Error creating academic year:', error);
    throw error;
  }
};

// Mentors
export const getMentors = async () => {
  try {
    const result = await client.graphql({
      query: queries.listMentors,
      variables: {
        filter: { status: { eq: 'ACTIVE' } },
        limit: 1000
      }
    });
    return result.data.listMentors.items;
  } catch (error) {
    console.error('Error fetching mentors:', error);
    throw error;
  }
};

export const createMentor = async (mentorData) => {
  try {
    const result = await client.graphql({
      query: mutations.createMentor,
      variables: { input: mentorData }
    });
    return result.data.createMentor;
  } catch (error) {
    console.error('Error creating mentor:', error);
    throw error;
  }
};

export const updateMentor = async (mentorData) => {
  try {
    const result = await client.graphql({
      query: mutations.updateMentor,
      variables: { input: mentorData }
    });
    return result.data.updateMentor;
  } catch (error) {
    console.error('Error updating mentor:', error);
    throw error;
  }
};

// Mentees
export const getMentees = async () => {
  try {
    const result = await client.graphql({
      query: queries.listMentees,
      variables: {
        filter: { status: { eq: 'ACTIVE' } },
        limit: 1000
      }
    });
    return result.data.listMentees.items;
  } catch (error) {
    console.error('Error fetching mentees:', error);
    throw error;
  }
};

export const createMentee = async (menteeData) => {
  try {
    const result = await client.graphql({
      query: mutations.createMentee,
      variables: { input: menteeData }
    });
    return result.data.createMentee;
  } catch (error) {
    console.error('Error creating mentee:', error);
    throw error;
  }
};

// Matches
export const getMatches = async (academicYearId = null) => {
  try {
    let variables = {
      limit: 1000
    };
    
    if (academicYearId) {
      variables.filter = { academicYearID: { eq: academicYearId } };
    }

    const result = await client.graphql({
      query: queries.listMentorMenteeMatches,
      variables
    });
    return result.data.listMentorMenteeMatches.items;
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};

export const createMatch = async (matchData) => {
  try {
    const result = await client.graphql({
      query: mutations.createMentorMenteeMatch,
      variables: { input: matchData }
    });
    return result.data.createMentorMenteeMatch;
  } catch (error) {
    console.error('Error creating match:', error);
    throw error;
  }
};

// Dashboard Stats
export const getDashboardStats = async (academicYearId) => {
  try {
    const [mentors, mentees, matches] = await Promise.all([
      getMentors(),
      getMentees(),
      getMatches(academicYearId)
    ]);

    const activeMatches = matches.filter(match => match.status === 'ACTIVE');
    const matchedMenteeIds = new Set(activeMatches.map(match => match.menteeID));
    const mentorMatchCounts = {};
    
    activeMatches.forEach(match => {
      mentorMatchCounts[match.mentorID] = (mentorMatchCounts[match.mentorID] || 0) + 1;
    });

    const availableMentors = mentors.filter(mentor => {
      const currentMentees = mentorMatchCounts[mentor.id] || 0;
      return currentMentees < (mentor.maxMentees || 3);
    });

    const unMatchedMentees = mentees.filter(mentee => !matchedMenteeIds.has(mentee.id));

    return {
      totalMentors: mentors.length,
      totalMentees: mentees.length,
      totalMatches: activeMatches.length,
      unMatchedMentees: unMatchedMentees.length,
      availableMentors: availableMentors.length
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

export default {
  getAcademicYears,
  getActiveAcademicYear,
  createAcademicYear,
  getMentors,
  createMentor,
  updateMentor,
  getMentees,
  createMentee,
  getMatches,
  createMatch,
  getDashboardStats
};