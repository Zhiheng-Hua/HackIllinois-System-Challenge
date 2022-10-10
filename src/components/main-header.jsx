import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from "../styles/index.module.scss";

const MainHeader = () => {
	return (
		<div className={styles.headerContainer}>
			HackIllinois 2023
		</div>
	);
};

export default MainHeader;
