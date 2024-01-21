import React from 'react';
import './PostSkeleton.css';

const PostSkeleton = () => {
	return (
		<div className="postSkeleton">
			<div className="postSkeletonImg"></div>
			<div className="postSkeletonInfo">
				<div className="postSkeletonCat"></div>
				<div className="postSkeletonTitle"></div>
				<div className="postSkeletonDate"></div>
				<div className="postSkeletonDesc"></div>
			</div>
		</div>
	);
};

export default PostSkeleton;