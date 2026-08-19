
const genres = [
  { id: "g1", name: "Drama" },
  { id: "g2", name: "Romance" },
  { id: "g3", name: "Action" },
  { id: "g4", name: "Comedy" },
  { id: "g5", name: "Musical" },
  { id: "g6", name: "Thriller" },
  { id: "g7", name: "Sports" },
  { id: "g8", name: "Family" },
  { id: "g9", name: "Fantasy" },
  { id: "g10", name: "Crime" },
];

const studios = [
  { id: "st1", name: "Yash Raj Films" },
  { id: "st2", name: "Dharma Productions" },
  { id: "st3", name: "UTV Motion Pictures" },
  { id: "st4", name: "Excel Entertainment" },
  { id: "st5", name: "Arka Media Works" },
  { id: "st6", name: "Mythri Movie Makers" },
  { id: "st7", name: "Geetha Arts" },
];

const directors = [
  { id: "d1", name: "Aditya Chopra" },
  { id: "d2", name: "Ashutosh Gowariker" },
  { id: "d3", name: "Rajkumar Hirani" },
  { id: "d4", name: "Zoya Akhtar" },
  { id: "d5", name: "Nitesh Tiwari" },
  { id: "d6", name: "Vikas Bahl" },
  { id: "d7", name: "Sriram Raghavan" },
  { id: "d8", name: "Aniruddha Roy Chowdhury" },
  { id: "d9", name: "Anurag Basu" },
  { id: "d10", name: "Karan Johar" },
  { id: "d11", name: "Rakeysh Omprakash Mehra" },
  { id: "d12", name: "Shimit Amin" },
  { id: "d13", name: "Shoojit Sircar" },
  { id: "d14", name: "S. S. Rajamouli" },
  { id: "d15", name: "Sandeep Reddy Vanga" },
  { id: "d16", name: "Sukumar" },
  { id: "d17", name: "Trivikram Srinivas" },
  { id: "d18", name: "Surender Reddy" },
  { id: "d19", name: "Parasuram Petla" },
  { id: "d20", name: "Puri Jagannadh" },
];

const actors = [
  { id: "a1", name: "Shah Rukh Khan", birthYear: 1965 },
  { id: "a2", name: "Kajol", birthYear: 1974 },
  { id: "a3", name: "Aamir Khan", birthYear: 1965 },
  { id: "a4", name: "R. Madhavan", birthYear: 1970 },
  { id: "a5", name: "Sharman Joshi", birthYear: 1978 },
  { id: "a6", name: "Boman Irani", birthYear: 1959 },
  { id: "a7", name: "Hrithik Roshan", birthYear: 1974 },
  { id: "a8", name: "Farhan Akhtar", birthYear: 1974 },
  { id: "a9", name: "Abhay Deol", birthYear: 1976 },
  { id: "a10", name: "Katrina Kaif", birthYear: 1983 },
  { id: "a11", name: "Ranveer Singh", birthYear: 1985 },
  { id: "a12", name: "Alia Bhatt", birthYear: 1993 },
  { id: "a13", name: "Fatima Sana Shaikh", birthYear: 1992 },
  { id: "a14", name: "Sanya Malhotra", birthYear: 1992 },
  { id: "a15", name: "Kangana Ranaut", birthYear: 1987 },
  { id: "a16", name: "Ayushmann Khurrana", birthYear: 1984 },
  { id: "a17", name: "Tabu", birthYear: 1971 },
  { id: "a18", name: "Radhika Apte", birthYear: 1985 },
  { id: "a19", name: "Amitabh Bachchan", birthYear: 1942 },
  { id: "a20", name: "Taapsee Pannu", birthYear: 1987 },
  { id: "a21", name: "Ranbir Kapoor", birthYear: 1982 },
  { id: "a22", name: "Priyanka Chopra", birthYear: 1982 },
  { id: "a23", name: "Ileana D'Cruz", birthYear: 1987 },
  { id: "a24", name: "Siddharth", birthYear: 1979 },
  { id: "a25", name: "Deepika Padukone", birthYear: 1986 },
  { id: "a26", name: "Irrfan Khan", birthYear: 1967 },
  { id: "a27", name: "Prabhas", birthYear: 1979 },
  { id: "a28", name: "Rana Daggubati", birthYear: 1984 },
  { id: "a29", name: "Anushka Shetty", birthYear: 1981 },
  { id: "a30", name: "Tamannaah", birthYear: 1989 },
  { id: "a31", name: "Vijay Deverakonda", birthYear: 1989 },
  { id: "a32", name: "Shalini Pandey", birthYear: 1993 },
  { id: "a33", name: "Allu Arjun", birthYear: 1983 },
  { id: "a34", name: "Rashmika Mandanna", birthYear: 1996 },
  { id: "a35", name: "N. T. Rama Rao Jr.", birthYear: 1983 },
  { id: "a36", name: "Ram Charan", birthYear: 1985 },
  { id: "a37", name: "Ajay Devgn", birthYear: 1969 },
  { id: "a38", name: "Samantha Ruth Prabhu", birthYear: 1987 },
  { id: "a39", name: "Kajal Aggarwal", birthYear: 1985 },
  { id: "a40", name: "Pooja Hegde", birthYear: 1990 },
  { id: "a41", name: "Nani", birthYear: 1984 },
  { id: "a42", name: "Sudeep", birthYear: 1971 },
  { id: "a43", name: "Chiranjeevi", birthYear: 1955 },
  { id: "a44", name: "Nayanthara", birthYear: 1984 },
  { id: "a45", name: "Mahesh Babu", birthYear: 1975 },
];

const movies = [
  { id: "m1", title: "Dilwale Dulhania Le Jayenge", releaseYear: 1995, rating: 8.0, description: "Two young NRIs fall in love on a European trip, then fight for that love back home in Punjab.", directorId: "d1", studioId: "st1", genreIds: ["g2", "g1"], actorIds: ["a1", "a2"] },
  { id: "m2", title: "Lagaan", releaseYear: 2001, rating: 8.1, description: "Villagers under colonial rule wager their tax burden on the outcome of a cricket match.", directorId: "d2", studioId: "st3", genreIds: ["g7", "g1", "g5"], actorIds: ["a3"] },
  { id: "m3", title: "3 Idiots", releaseYear: 2009, rating: 8.4, description: "Two friends search for their long-lost engineering-college roommate, unraveling his unconventional legacy.", directorId: "d3", studioId: "st3", genreIds: ["g4", "g1"], actorIds: ["a3", "a4", "a5", "a6"] },
  { id: "m4", title: "Zindagi Na Milegi Dobara", releaseYear: 2011, rating: 8.1, description: "Three friends confront old fears and unfinished business on a bachelor road trip through Spain.", directorId: "d4", studioId: "st4", genreIds: ["g1", "g4"], actorIds: ["a7", "a8", "a9", "a10"] },
  { id: "m5", title: "Gully Boy", releaseYear: 2019, rating: 7.9, description: "A young man from Mumbai's slums finds his voice through underground rap.", directorId: "d4", studioId: "st4", genreIds: ["g1", "g5"], actorIds: ["a11", "a12"] },
  { id: "m6", title: "Dangal", releaseYear: 2016, rating: 8.4, description: "A former wrestler trains his daughters to become India's first world-class female wrestlers.", directorId: "d5", studioId: "st3", genreIds: ["g7", "g1"], actorIds: ["a3", "a13", "a14"] },
  { id: "m7", title: "Queen", releaseYear: 2013, rating: 8.2, description: "Jilted days before her wedding, a young woman takes her honeymoon alone and discovers herself.", directorId: "d6", studioId: "st2", genreIds: ["g4", "g1"], actorIds: ["a15"] },
  { id: "m8", title: "Andhadhun", releaseYear: 2018, rating: 8.2, description: "A blind pianist becomes an accidental witness to a murder, blurring the line between deception and survival.", directorId: "d7", studioId: "st3", genreIds: ["g6", "g10", "g4"], actorIds: ["a16", "a17", "a18"] },
  { id: "m9", title: "Pink", releaseYear: 2016, rating: 8.1, description: "A retired lawyer defends three young women against a campaign to discredit them after a violent altercation.", directorId: "d8", studioId: "st2", genreIds: ["g1", "g6"], actorIds: ["a19", "a20"] },
  { id: "m10", title: "Barfi!", releaseYear: 2012, rating: 8.1, description: "A deaf-mute man's playful romance with two very different women unfolds in 1970s Darjeeling.", directorId: "d9", studioId: "st3", genreIds: ["g2", "g1", "g4"], actorIds: ["a21", "a22", "a23"] },
  { id: "m11", title: "Kabhi Khushi Kabhie Gham", releaseYear: 2001, rating: 7.4, description: "A wealthy family fractures when the adopted elder son marries outside his class, and years later must reunite.", directorId: "d10", studioId: "st2", genreIds: ["g1", "g8", "g5"], actorIds: ["a1", "a2", "a19", "a7"] },
  { id: "m12", title: "Rang De Basanti", releaseYear: 2006, rating: 8.1, description: "A documentary shoot pulls a group of disillusioned college friends into political awakening and action.", directorId: "d11", studioId: "st3", genreIds: ["g1"], actorIds: ["a3", "a24", "a4"] },
  { id: "m13", title: "Swades", releaseYear: 2004, rating: 8.2, description: "A NASA scientist returns to his ancestral village and confronts what home and duty really mean.", directorId: "d2", studioId: "st3", genreIds: ["g1"], actorIds: ["a1"] },
  { id: "m14", title: "Chak De! India", releaseYear: 2007, rating: 8.0, description: "A disgraced former hockey captain coaches the women's national team toward redemption.", directorId: "d12", studioId: "st1", genreIds: ["g7", "g1"], actorIds: ["a1"] },
  { id: "m15", title: "Piku", releaseYear: 2015, rating: 7.6, description: "A short road trip with her aging, hypochondriac father tests a young woman's patience and devotion.", directorId: "d13", studioId: "st2", genreIds: ["g4", "g1"], actorIds: ["a25", "a19", "a26"] },
  { id: "m16", title: "Baahubali: The Beginning", releaseYear: 2015, rating: 8.0, description: "A young man raised in a waterfall village uncovers his royal destiny and a kingdom's buried past.", directorId: "d14", studioId: "st5", genreIds: ["g3", "g9"], actorIds: ["a27", "a28", "a29", "a30"] },
  { id: "m17", title: "Baahubali 2: The Conclusion", releaseYear: 2017, rating: 8.2, description: "The saga concludes with the answer to why Kattappa killed Baahubali, and the fight to reclaim a throne.", directorId: "d14", studioId: "st5", genreIds: ["g3", "g9"], actorIds: ["a27", "a28", "a29", "a30"] },
  { id: "m18", title: "RRR", releaseYear: 2022, rating: 7.9, description: "Two real-life revolutionaries meet in a fictional friendship forged before their fight against colonial rule.", directorId: "d14", studioId: "st6", genreIds: ["g3", "g1"], actorIds: ["a35", "a36", "a12", "a37"] },
  { id: "m19", title: "Arjun Reddy", releaseYear: 2017, rating: 8.1, description: "A brilliant, short-tempered surgeon spirals into self-destruction after losing the woman he loves.", directorId: "d15", studioId: "st7", genreIds: ["g2", "g1"], actorIds: ["a31", "a32"] },
  { id: "m20", title: "Pushpa: The Rise", releaseYear: 2021, rating: 7.6, description: "A laborer rises through the ranks of a red sandalwood smuggling syndicate through sheer will.", directorId: "d16", studioId: "st6", genreIds: ["g3", "g1"], actorIds: ["a33", "a34"] },
  { id: "m21", title: "Ala Vaikunthapurramuloo", releaseYear: 2020, rating: 7.4, description: "A young man discovers he was switched at birth and must reclaim his place in his real family.", directorId: "d17", studioId: "st7", genreIds: ["g8", "g3", "g4"], actorIds: ["a33", "a40"] },
  { id: "m22", title: "Rangasthalam", releaseYear: 2018, rating: 8.2, description: "A hearing-impaired villager takes on a corrupt local power structure to avenge his brother.", directorId: "d16", studioId: "st6", genreIds: ["g1", "g3"], actorIds: ["a36", "a38"] },
  { id: "m23", title: "Magadheera", releaseYear: 2009, rating: 7.4, description: "A modern-day biker discovers his past-life bond with a warrior princess spans four centuries.", directorId: "d14", studioId: "st7", genreIds: ["g3", "g9", "g2"], actorIds: ["a36", "a39"] },
  { id: "m24", title: "Eega", releaseYear: 2012, rating: 7.4, description: "A murdered man is reincarnated as a housefly and sets out to protect the woman he loved.", directorId: "d14", studioId: "st7", genreIds: ["g9", "g3", "g4"], actorIds: ["a41", "a38", "a42"] },
  { id: "m25", title: "Sye Raa Narasimha Reddy", releaseYear: 2019, rating: 7.3, description: "A tribal chieftain leads an armed uprising against colonial rule decades before the 1857 revolt.", directorId: "d18", studioId: "st6", genreIds: ["g3", "g1"], actorIds: ["a43", "a44"] },
  { id: "m26", title: "Geetha Govindam", releaseYear: 2018, rating: 7.6, description: "A misunderstanding on a train sets off a slow-burn romance between two mismatched strangers.", directorId: "d19", studioId: "st7", genreIds: ["g2", "g4"], actorIds: ["a31", "a34"] },
  { id: "m27", title: "Pokiri", releaseYear: 2006, rating: 7.9, description: "An undercover cop poses as a small-time gangster to infiltrate a criminal network from within.", directorId: "d20", studioId: "st6", genreIds: ["g3", "g6"], actorIds: ["a45", "a23"] },
  { id: "m28", title: "Businessman", releaseYear: 2012, rating: 7.3, description: "A criminal mastermind builds a citywide extortion racket run with corporate-style precision.", directorId: "d20", studioId: "st6", genreIds: ["g3", "g10"], actorIds: ["a45", "a39"] },
];

module.exports = { genres, studios, directors, actors, movies };








// Pure seed data for CineGraph — separated from the runner script for readability.
// This dataset uses real, well-known Bollywood and Tollywood (Telugu cinema)
// films, actors, and directors. Titles, years, directors, and lead cast are
// drawn from well-documented, widely known facts. A few studio-to-film
// production credits are approximate/illustrative rather than verified —
// this is seed data for a graph-database demo, not an authoritative
// filmography, so double-check any specific credit before relying on it.
