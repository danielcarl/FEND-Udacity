// MODIFICATIONS / ADDITIONAL INTERACTIVITY
// ** Added the URL for schools by performing an additional .replace
//

var bio = {

	"name" : "Daniel R Carl Jr",
	"role" : "Software Developer",

	"contacts" : {
    	"mobile" : "216.555.1234",
    	"email" : "daniel@geekfan.com",
    	"github" : "danielcarl",
    	"twitter" : "@dancarl23",
    	"location" : "Cleveland, OH"
    },

	"welcomeMessage" : "Fnord.",
	"skills" : ["HTML5 / CSS3", "JavaScript / jQuery", "Java 7 / Groovy / Grails"],
	"biopic" : "images/me.jpg",

	"display" : function() {

		var formattedName = HTMLheaderName.replace("%data%", bio.name);
		var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
		var formattedPhoto = HTMLbioPic.replace("%data%", bio.biopic);
		var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
		var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
		var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
		var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
		var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
		var formattedContacts = formattedMobile + formattedEmail + formattedGithub + formattedTwitter + formattedLocation;
		var formattedWelcome = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);

		$("#header").prepend(formattedRole);
		$("#header").prepend(formattedName);
		$("#topContacts").append(formattedContacts);
		$("#header").append(formattedPhoto);
		$("#header").append(formattedWelcome);

		if (bio.skills.length > 0) {
			$("#header").append(HTMLskillsStart);
			for(skill in bio.skills) {
				$("#header").append(HTMLskills.replace("%data%", bio.skills[skill]));
			}
		}

		$("#footerContacts").append(formattedContacts);

		// Since instructions state all functions must reside in objects, I am placing the Map append here
		$("#mapDiv").append(googleMap);
	}
}

var education = {

	"schools" : [
		{
     		"name": "Cuyahoga Community College",
     		"location": "Cleveland, OH, US",
     		"degree": "N/A",
     		"majors": ["General Arts"],
     		"dates": 2000,
     		"url": "http://www.tri-c.edu"
     	},
     	{
     		"name": "Case Western Reserve University",
     		"location": "Cleveland, OH, US",
     		"degree": "N/A",
     		"majors": ["Theater"],
     		"dates": 1991,
     		"url": "http://www.case.edu"
     	}
    ],
	"onlineCourses" : [
		{
     		"title": "Intro to HTML and CSS",
     		"school": "Udacity",
     		"date": 2015,
     		"url": "http://www.udacity.com"
     	}
    ],

    "display" : function() {

		if(education.schools.length > 0) {
			for(school in education.schools) {
				$("#education").append(HTMLschoolStart);
				var formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[school].name);
				formattedSchoolName = formattedSchoolName.replace("#", education.schools[school].url);
				var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
				var formattedSchoolDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
				var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
				var formattedSchoolMajors = '';
				for(major in education.schools[school].majors) {
					var formattedSchoolMajor = HTMLschoolMajor.replace("%data%", education.schools[school].majors[major]);
					formattedSchoolMajors = formattedSchoolMajors + formattedSchoolMajor;
				};
				$(".education-entry:last").append(formattedSchoolName + formattedSchoolDegree + formattedSchoolDates + formattedSchoolLocation + formattedSchoolMajors);
			};
		};

		if(education.onlineCourses.length > 0) {
			$("#education").append(HTMLonlineClasses);
			$("#education").append(HTMLschoolStart);
			for(onlineCourse in education.onlineCourses) {
				var formattedOnlineCourseTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[onlineCourse].title);
				formattedOnlineCourseTitle = formattedOnlineCourseTitle.replace("#", education.onlineCourses[onlineCourse].url);
				var formattedOnlineCourseSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[onlineCourse].school);
				var formattedOnlineCourseDate = HTMLonlineDates.replace("%data%", education.onlineCourses[onlineCourse].date);
				var formattedOnlineCourseUrl = HTMLonlineURL.replace("%data%", education.onlineCourses[onlineCourse].url);
				formattedOnlineCourseUrl = formattedOnlineCourseUrl.replace("#", education.onlineCourses[onlineCourse].url);
				$(".education-entry:last").append(formattedOnlineCourseTitle + formattedOnlineCourseSchool + formattedOnlineCourseDate + formattedOnlineCourseUrl);
			};
		};
	}
}

var work = {

	"jobs" : [
		{
			"employer" : "Heureka Software",
			"title" : "Software Developer",
			"dates" : "2010 - present",
			"location" : "Cleveland, OH, US",
			"description" : "Create, test, and deploy search platforms in SaaS and appliance (end-user hosted) environments."
		},
		{
			"employer" : "OverDrive",
			"title" : "Project Manager",
			"dates" : "2007 - 2010",
			"location" : "Valley View, OH, US",
			"description" : "Managed projects for all hosted retail customers."
		}
	],

	"display" : function() {
		if(work.jobs.length > 0) {
			for(job in work.jobs) {
				$("#workExperience").append(HTMLworkStart);
				var formattedWorkEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
				var formattedWorkTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
				var formattedWorkLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
				var formattedWorkDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
				var formattedWorkDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
				var formattedWorkEntry = formattedWorkEmployer + formattedWorkTitle + formattedWorkLocation + formattedWorkDates + formattedWorkDescription;
				$(".work-entry:last").append(formattedWorkEntry);
			}
		}
	}

}

var projects = {

    "projects" : [
    	// TODO: Replace placeholder images with project screenshots once I have a few more projects to flaunt
		{
			"title" : "P1: HTML Portfolio Site",
			"dates" : "2015",
			"description" : "Portfolio project for Udacity Front-End Nanodegree",
			"images" : ["images/cherries.jpg","images/motivation.jpg", "images/travel.jpg"]
		},
		{
			"title" : "P2: Interactive Resume",
			"dates" : "2015",
			"description" : "JavaScript / jQuery project for Udacity Front-End Nanodegree",
			"images" : ["images/bird.jpg", "images/glasses.jpg", "images/mantis.jpg"]
		}
	],

	"display" : function() {
		if(projects.projects.length > 0) {
			for(project in projects.projects) {
				$("#projects").append(HTMLprojectStart);
				var formattedProjectTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
				var formattedProjectDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
				var formattedProjectDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
				var formattedProjectImages = '';
				for(image in projects.projects[project].images) {
					var formattedProjectImage = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
					formattedProjectImages = formattedProjectImages + formattedProjectImage;
				}
				var formattedProjectEntry = formattedProjectTitle + formattedProjectDates + formattedProjectDescription + formattedProjectImages;
				$(".project-entry:last").append(formattedProjectEntry);
			}
		}
	}

}

bio.display();
education.display();
work.display();
projects.display();