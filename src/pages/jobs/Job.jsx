// import Stories from "../../components/stories/Stories"
import JobPosts from "../../components/JobPosts/jobPosts"
import Share from "../../components/shareJob/ShareJob"
import "./job.scss"

const JobPage = () => {
  return (
    <div className="home">
      {/* <Stories/> */}
      <Share/>
      <JobPosts/>
    </div>
  )
}

export default JobPage