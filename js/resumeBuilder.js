var bio = {
	"name" : "Daniel R Carl Jr",
	"role" : "Front End Web Developer",
	"contacts" : {
    	"mobile" : "216.904.4335",
    	"email" : "danielcarl23@gmail.com",
    	"github" : "danielcarl",
    	"twitter" : "@dancarl23",
    	"location" : "Austin, TX"
    },
	"welcomeMessage" : "Fnord.",
	"skills" : [
		"Languages & Databases: HTML5, CSS3, JavaScript, jQuery, Java, Groovy, PHP, SQL", 
		"Frameworks & Servers: Backbone, Knockout, Grails, Apache Tomcat, Apache HTTP", 
		"Applications & Tools: Git, Subversion, Sublime, Netbeans, Jenkins, Ansible, Docker, Adobe CC",
		"Operating Systems: Apple OSX, Ubuntu / Centos Linux, Microsoft Windows"
	],
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
	}
}

var education = {
	"schools" : [
		{
     		"name": "Cuyahoga Community College",
     		"location": "Cleveland, OH, US",
     		"degree": "N/A",
     		"majors": ["Computer Science, Theater, General Arts"],
     		"dates": "1993 - 2002",
     		"url": "http://www.tri-c.edu"
     	},
     	{
     		"name": "Case Western Reserve University",
     		"location": "Cleveland, OH, US",
     		"degree": "N/A",
     		"majors": ["Theater, English, Computer Science"],
     		"dates": "1998 - 1991",
     		"url": "http://www.case.edu"
     	}
    ],
	"onlineCourses" : [
		{
     		"title": "Front End Web Developer Nanodegree",
     		"school": "Udacity",
     		"date": "2015 - 2016",
     		"url": "http://www.udacity.com"
     	},
     	{
     		"title" : "GIAC",
     		"school" : "Certified Web Application Defender",
     		"date" : "2014 - 2018",
     		"url" : "https://www.youracclaim.com/badges/76b5fbd2-d518-45d4-80fb-3ab058e2232d/linked_in_profile"
     	}
    ],
    "display" : function() {
		if(education.onlineCourses.length > 0) {
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
	}
}

var work = {
	"jobs" : [
		{
			"employer" : "Heureka Software",
			"title" : "Software Developer II",
			"dates" : "09/2011 - 03/2016",
			"location" : "Cleveland, OH",
			"description" : "Built and maintained web apps written in JavaScript, Grails, Java, and PHP. Designed and deployed MSSQL and MySQL databases. Maintained weekly database backup rotation. Deployed and maintained Apache Tomcat and Apache HTTP web servers hosted on Linux and Windows."
		},
		{
			"employer" : "Visual Evidence / E-Discovery LLC",
			"title" : "Technician",
			"dates" : "06/2010 - 09/2011",
			"location" : "Cleveland, OH",
			"description" : "Managed software updates on over two dozen Windows / Linux servers. Deployed new Windows and Linux servers in CoLo as needed."
		},
		{
			"employer" : "OverDrive",
			"title" : "Project Manager",
			"dates" : "05/2007 - 03/2010",
			"location" : "Cleveland, OH",
			"description" : "Increased updates of Harlequin retail site from monthly to weekly. Managed the build and deployment of the Borders Books Digital Audio store. Helped write Document Type Definition (DTD) schemas for proprietary XML files. Wrote technical documentation for various in house and public facing tools."
		},
		{
			"employer" : "Lorain County Community College",
			"title" : "Adjunct Professor",
			"dates" : "01/2007 - 05/2007",
			"location" : "Lorain, OH",
			"description" : "Created and taught first half of Introduction to Game Design course. Focused on the non-programming aspects of game design - story, game mechanics, level progression. Projects included deconstruction of traditional card games, rule modification of popular board games, and introduction to MMO play (World of Warcraft)."
		},
		{
			"employer" : "Self Employed",
			"title" : "Freelance Web Developer / IT Consultant",
			"dates" : "01/2004 - 05/2007",
			"location" : "Cleveland, OH",
			"description" : "Provided web development, email campaign management, and general IT support for various clients."
		},
		{
			"employer" : "Northeast Ohio Videogame Initiative",
			"title" : "Founder",
			"dates" : "05/2005 - 05/2007",
			"location" : "Cleveland, OH",
			"description" : "Promoted computer game development as both a potential target industry and STEM curricula amongst civic and higher educational institutions in Northeast Ohio. Solicited and received funding from the Cleveland Foundation’s Civic Innovation Lab to launch initiative."
		},
		{
			"employer" : "Greater Cleveland Media Development Corporation",
			"title" : "Digital Media Coordinator",
			"dates" : "11/2001 - 05/2005",
			"location" : "Cleveland, OH",
			"description" : "Updated and managed company website, adding dynamic features such as a film crew catalog (PHP, MySQL)  and photo location library (PHP, MySQL, Photoshop). Worked with GCMDC president to identify and support entertainment-related companies that fell outside of the film industry, including game and web application developers."
		},
		{
			"employer" : "The Leader Mortgage Company",
			"title" : "IT Installation and Support Supervisor",
			"dates" : "07/1997 - 09/2001",
			"location" : "Cleveland, OH",
			"description" : "Lead team of four technicians that supported Windows 95/98 desktops for 250+ employees across multiple offices. Planned and executed upgrade of all desktop and server operating systems in preparation for Y2K compliance. Drafted and taught IT training sessions for new employees."
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

bio.display();
education.display();
work.display();