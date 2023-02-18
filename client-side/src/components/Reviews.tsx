import React, { useState } from 'react'
import styled from 'styled-components'
import { postRating } from '../APIs/ratingsAPI'
import StarIcon from '../assets/star.icon'
import { Rating } from '../models/Film'
import { useFilmsStore } from '../stores'
import useUsersStore from '../stores/userStore'
import Button from './Button'
import Input from './Input'
import Typography from './Typography'

const StyledReviews = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: black;
  border-radius: 10px;
  padding: 32px;
  max-height: 500px;
  width: 500px;
  z-index: 5;
  overflow: overlay;

  p {
    margin: 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 10px 0;
  }

  li:not(:last-of-type) {
    border-bottom: 1px solid #333;
  }

  .field {
    padding: 7px 0;
  }

`

const StyledBlocker = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.75);
  z-index: 4;
`

const Reviews = ({reviews, filmId, onClose}: { reviews: Rating[], filmId: string, onClose: () => void}) => {
  const user = useUsersStore((state) => state.user);
  const getFilms = useFilmsStore((state) => state.getFilms);
  const [isWriting, setIsWriting] = useState(false);
  const defaultNewReview = {
    userId: user?.id || 0,
    rating: 1,
    commentTitle: "",
    commentContent: ""
  } 
  const [newReview, setNewReview] = useState<Rating>(defaultNewReview);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewReview({ ...newReview, [name]: value });
  }

  const handleReviewPost = async () => {
    if (!newReview.rating || !newReview.commentContent || !newReview.commentTitle) return;
    await postRating(newReview, filmId);
    getFilms();
    setIsWriting(false);
    setNewReview(defaultNewReview);
  }

  return (<>
    <StyledReviews>
      {isWriting ? (<div>
        <div className='field'>
          <Typography styles={{ marginBottom: "5px"}}>Rating </Typography>
          <Input name="rating" type="number" style={{ width: "100px"}} placeholder="e.g. 5" min="1" max="5" onChange={handleChange} defaultValue="1" />
        </div>
        <div className='field'>
          <Typography styles={{ marginBottom: "5px"}}>Review Title </Typography>
          <Input name="commentTitle" placeholder="Write title here" onChange={handleChange} />
        </div>
        <div className='field'>
          <Typography styles={{ marginBottom: "5px"}}>Review Content </Typography>
          <Input name="commentContent" placeholder="Write review here" onChange={handleChange} />
        </div>
        <Button minimal style={{ color: "white", borderColor: "white", marginTop: "15px", width: "100%" }} onClick={handleReviewPost}>Post</Button>
      </div>) : (<div>
        <Typography size={24} weight="500" styles={{ marginBottom: "10px"}}>User Reviews</Typography>
        {!!reviews.length ? (<ul>
          {reviews.map((review) => (
            <li>
              <Typography>{review.userId} <StarIcon /> {review.rating}/5</Typography> 
              <Typography size={18} weight="500" styles={{ marginBottom: "10px"}}>{review.commentTitle}</Typography>
              <Typography>{review.commentContent}</Typography>
            </li>
          )) }
        </ul>) : <Typography>There are no reviews yet</Typography>}
        <Button minimal style={{ color: "white", borderColor: "white", marginTop: "15px", width: "100%" }} onClick={() => setIsWriting(true)}>Write a review</Button>
      </div>)}
    </StyledReviews>
    <StyledBlocker onClick={onClose} />
  </>
  )
}

export default Reviews