import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";
import { collegesData } from "./CollegeData";

const CollegeTable = () => {
  const [colleges, setColleges] = useState([]);
  const [displayedColleges, setDisplayedColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  //   const collegesData = [
  //     {
  //       id: 1,
  //       name: "IIT Madras",
  //       location: "Chennai",
  //       fees: 209550,
  //       reviews: 8.6,
  //       ranking: 3,
  //       featured: false,
  //       imageUrl:
  //         "https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg",
  //     },
  //     {
  //       id: 2,
  //       name: "IIT Delhi",
  //       location: "New Delhi",
  //       fees: 254650,
  //       reviews: 8.7,
  //       ranking: 1,
  //       featured: false,
  //       imageUrl:
  //         "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg/800px-Indian_Institute_of_Technology_Delhi_Logo.svg.png",
  //     },
  //     {
  //       id: 3,
  //       name: "Parul University",
  //       location: "Vadodara",
  //       fees: 149000,
  //       reviews: 8.1,
  //       ranking: 99,
  //       featured: true,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLBVMKv3x1SHvTICkV5R4nIPjj2ibc_JIw0Q&s",
  //     },
  //     {
  //       id: 4,
  //       name: "BITS Pilani",
  //       location: "Pilani",
  //       fees: 367000,
  //       reviews: 9.0,
  //       ranking: 4,
  //       featured: false,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsB6_TIECebFcMLjpFmucPxout2DIBr6mNFw&s",
  //     },
  //     {
  //       id: 5,
  //       name: "IIT Bombay",
  //       location: "Mumbai",
  //       fees: 225000,
  //       reviews: 9.2,
  //       ranking: 2,
  //       featured: true,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb54PRQgsD35Jb12CvSVQMQrkfg1iqw0q6rw&s",
  //     },
  //     {
  //       id: 6,
  //       name: "IIT Kharagpur",
  //       location: "Kharagpur",
  //       fees: 215000,
  //       reviews: 8.5,
  //       ranking: 6,
  //       featured: false,
  //       imageUrl:
  //         "https://upload.wikimedia.org/wikipedia/en/3/36/IIT_Kharagpur_logo.svg",
  //     },
  //     {
  //       id: 7,
  //       name: "IIT Kanpur",
  //       location: "Kanpur",
  //       fees: 223000,
  //       reviews: 8.4,
  //       ranking: 7,
  //       featured: false,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJB6Rl7yXxDbUqXkmEgEw7t_VTXSKEnqM7Yw&s",
  //     },
  //     {
  //       id: 8,
  //       name: "VIT Vellore",
  //       location: "Vellore",
  //       fees: 180000,
  //       reviews: 8.2,
  //       ranking: 18,
  //       featured: true,
  //       imageUrl:
  //         "https://w7.pngwing.com/pngs/844/296/png-transparent-vellore-institute-of-technology-engineering-entrance-examination-university-vitmee-exam-education-student-text-people-logo.png",
  //     },
  //     {
  //       id: 9,
  //       name: "SRM Institute",
  //       location: "Chennai",
  //       fees: 175000,
  //       reviews: 8.0,
  //       ranking: 12,
  //       featured: false,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUoko4aGH9-9mtvI8DS5KYIiDSXtUm9QiN5g&s",
  //     },
  //     {
  //       id: 10,
  //       name: "Anna University",
  //       location: "Chennai",
  //       fees: 50000,
  //       reviews: 7.9,
  //       ranking: 20,
  //       featured: false,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr3cM5qpPNHqLr6ANwQoxLoJggxNS8FmEt8w&s",
  //     },
  //     {
  //       id: 11,
  //       name: "IIT Roorkee",
  //       location: "Roorkee",
  //       fees: 230000,
  //       reviews: 8.6,
  //       ranking: 8,
  //       featured: false,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTD97cUoFmKMtxZ5fJ43zDMeYnZj3igngyQ&s",
  //     },
  //     {
  //       id: 12,
  //       name: "Jadavpur University",
  //       location: "Kolkata",
  //       fees: 10000,
  //       reviews: 8.8,
  //       ranking: 9,
  //       featured: true,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTqWOgEqN8nFsOb8Kt4AHUx2kT1NU-0hVf1w&s",
  //     },
  //     {
  //       id: 13,
  //       name: "IIT Guwahati",
  //       location: "Guwahati",
  //       fees: 200000,
  //       reviews: 8.5,
  //       ranking: 10,
  //       featured: false,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnI5BvtR3A2c4TnOO6XoHvpaHqX49ZpdtHTQ&s",
  //     },
  //     {
  //       id: 14,
  //       name: "NIT Trichy",
  //       location: "Tiruchirappalli",
  //       fees: 140000,
  //       reviews: 8.4,
  //       ranking: 15,
  //       featured: false,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhzkR-hwQgh2EF-OFAUX8j6dP_7OuoIU2peA&s",
  //     },
  //     {
  //       id: 15,
  //       name: "Amrita Vishwa Vidyapeetham",
  //       location: "Coimbatore",
  //       fees: 180000,
  //       reviews: 7.8,
  //       ranking: 19,
  //       featured: false,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFwzWx4opkl9RTgnoqOADugW0D_8LVHwoTOQ&s",
  //     },
  //     {
  //       id: 16,
  //       name: "Manipal University",
  //       location: "Manipal",
  //       fees: 260000,
  //       reviews: 8.7,
  //       ranking: 14,
  //       featured: true,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8llCGxCBScSAbDQzXCN4Ro1qf3hfJWqtfQ&s",
  //     },
  //     {
  //       id: 17,
  //       name: "NIT Warangal",
  //       location: "Warangal",
  //       fees: 140000,
  //       reviews: 8.3,
  //       ranking: 13,
  //       featured: false,
  //       imageUrl:
  //         "https://upload.wikimedia.org/wikipedia/en/f/fb/National_Institute_of_Technology%2C_Warangal_logo.png",
  //     },
  //     {
  //       id: 18,
  //       name: "IIT Bhubaneswar",
  //       location: "Bhubaneswar",
  //       fees: 220000,
  //       reviews: 8.0,
  //       ranking: 11,
  //       featured: false,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7kTWmjOnoRT1fv7oUy0fM-Kqj37TWa7Re5Q&s",
  //     },
  //     {
  //       id: 19,
  //       name: "IIT Hyderabad",
  //       location: "Hyderabad",
  //       fees: 215000,
  //       reviews: 8.4,
  //       ranking: 5,
  //       featured: false,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCWrcJ9Jmdt7XQBzbNVlnpaRc1XzbwxQP7Lw&s",
  //     },
  //     {
  //       id: 20,
  //       name: "IIT Indore",
  //       location: "Indore",
  //       fees: 215000,
  //       reviews: 8.0,
  //       ranking: 16,
  //       featured: false,
  //       imageUrl:
  //         "https://upload.wikimedia.org/wikipedia/en/6/68/IIT_Indore_logo.svg",
  //     },
  //     {
  //       id: 21,
  //       name: "IIT Bhilai",
  //       location: "Bhilai",
  //       fees: 210000,
  //       reviews: 7.7,
  //       ranking: 23,
  //       featured: false,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHIj9YVqlXpOBgmmQUJ36M8MgYIhJUJhK9Mg&s",
  //     },
  //     {
  //       id: 22,
  //       name: "IIT Mandi",
  //       location: "Mandi",
  //       fees: 210000,
  //       reviews: 7.9,
  //       ranking: 22,
  //       featured: false,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe5_nUG3HxYcsNL3JfsMj0Jpgh1gy7bqlgqQ&s",
  //     },
  //     {
  //       id: 23,
  //       name: "IIT Jodhpur",
  //       location: "Jodhpur",
  //       fees: 210000,
  //       reviews: 8.1,
  //       ranking: 17,
  //       featured: false,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgfntvksArvsB39rgjeVFto-s_m12myQ_wew&s",
  //     },
  //     {
  //       id: 24,
  //       name: "VJTI Mumbai",
  //       location: "Mumbai",
  //       fees: 60000,
  //       reviews: 7.8,
  //       ranking: 24,
  //       featured: false,
  //       imageUrl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRd6KuNqy3SSJstCjAdiTTnxpIrfcLorm29A&s",
  //     },
  //     {
  //       id: 25,
  //       name: "NIT Surathkal",
  //       location: "Surathkal",
  //       fees: 140000,
  //       reviews: 8.3,
  //       ranking: 21,
  //       featured: false,
  //       imageUrl:
  //         "https://upload.wikimedia.org/wikipedia/en/5/5e/NIT_Surathkal_logo.png",
  //     },
  //   ];

  const fetchMoreData = () => {
    if (displayedColleges.length >= colleges.length) {
      setHasMore(false);
      return;
    }

    const moreData = colleges.slice(
      displayedColleges.length,
      displayedColleges.length + 10
    );
    setTimeout(() => {
      setDisplayedColleges([...displayedColleges, ...moreData]);
    }, 1500);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredColleges = colleges.filter((college) =>
      college.name.toLowerCase().includes(query)
    );
    setDisplayedColleges(filteredColleges.slice(0, 10));
    setHasMore(filteredColleges.length > 10);
  };

  const sortColleges = (key, order) => {
    const sortedColleges = [...colleges].sort((a, b) => {
      if (order === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setColleges(sortedColleges);
    setDisplayedColleges(sortedColleges.slice(0, 10));
    setHasMore(sortedColleges.length > 10);
  };

  useEffect(() => {
    setColleges(collegesData);
    setDisplayedColleges(collegesData.slice(0, 10));
  }, []);

  return (
    <div className="app">
      <div className="controls">
        <input
          type="text"
          placeholder="Search by college name"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select onChange={(e) => sortColleges(e.target.value, sortOrder)}>
          <option value="ranking">Sort by Ranking</option>
          <option value="fees">Sort by Fees</option>
          <option value="reviews">Sort by User Reviews</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <InfiniteScroll
        dataLength={displayedColleges.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <table className="college-table">
          <thead style={{ color: "#fff" }}>
            <tr>
              <th>CD Rank</th>
              <th>Colleges</th>
              <th>Course Fees</th>
              <th>Placement</th>
              <th>User Reviews</th>
              <th>Ranking</th>
            </tr>
          </thead>
          <tbody>
            {displayedColleges.map((college) => (
              <tr
                key={college.id}
                className={college.featured ? "featured-row" : ""}
              >
                <td>#{college.id}</td>
                <td>
                  <div className="college-name">
                    <img
                      src={college.imageUrl}
                      alt="logo"
                      className="college-logo"
                    />
                    <div className="college-info">
                      <h4>{college.name}</h4>

                      <p>{college.location}</p>
                    </div>
                  </div>
                </td>
                <td>₹{college.fees}</td>
                <td>
                  Average: ₹{(college.fees / 10).toLocaleString()} <br />
                  Highest: ₹{(college.fees * 10).toLocaleString()}
                </td>
                <td>{college.reviews}/10</td>
                <td>#{college.ranking}</td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default CollegeTable;
