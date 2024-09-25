import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';
import { collegesData } from './CollegeData';

const CollegeTable = () => {
  const [colleges, setColleges] = useState([]);
  const [displayedColleges, setDisplayedColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchMoreData = () => {
    if (displayedColleges.length >= colleges.length) {
      setHasMore(false);
      return;
    }

    const moreData = colleges.slice(displayedColleges.length, displayedColleges.length + 10);
    setTimeout(() => {
      setDisplayedColleges([...displayedColleges, ...moreData]);
    }, 1500);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredColleges = colleges.filter((college) => college.name.toLowerCase().includes(query));
    setDisplayedColleges(filteredColleges.slice(0, 10));
    setHasMore(filteredColleges.length > 10);
  };

  const sortColleges = (key, order) => {
    const sortedColleges = [...colleges].sort((a, b) => {
      if (order === 'asc') {
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
    <div className='app'>
      <div className='controls'>
        <input type='text' placeholder='Search by college name' value={searchQuery} onChange={handleSearch} />
        <select onChange={(e) => sortColleges(e.target.value, sortOrder)}>
          <option value='ranking'>Sort by Ranking</option>
          <option value='fees'>Sort by Fees</option>
          <option value='reviews'>Sort by User Reviews</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
      </div>

      <InfiniteScroll
        dataLength={displayedColleges.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <table className='college-table'>
          <thead style={{ color: '#fff' }}>
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
              <tr key={college.id} className={college.featured ? 'featured-row' : ''}>
                <td>#{college.id}</td>
                <td>
                  <div className='college-name'>
                    <img src={college.imageUrl} alt='logo' className='college-logo' />
                    <div className='college-info'>
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
                <td>#{college.ranking}</td>{' '}
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default CollegeTable;
