import React from 'react';
import './singlePostSkeleton.css';

export default function SinglePostSkeleton() {
	return (
		<div className="singlePostSkeleton">
			<div className="singlePostWrapperSkeleton">
				<div className="singlePostImgSkeleton"></div>
				<h1 className="singlePostTitleSkeleton"></h1>
				<div className="singlePostInfoSkeleton">
					<span className="singlePostAuthorSkeleton"></span>
					<span className="singlePostDateSkeleton"></span>
				</div>
			<p className="singlePostDescSkeleton"></p>
			<p className="singlePostDescSkeleton"></p>
			<p className="singlePostDescSkeleton"></p>
			<p className="singlePostDescSkeleton"></p>
			</div>
		</div>
	);
}