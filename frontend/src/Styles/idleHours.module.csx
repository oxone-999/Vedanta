.employee {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: auto;
  height: 27rem;
  width: 60rem;
}

.employee::-webkit-scrollbar {
  width: 0.5em;
}

.employee::-webkit-scrollbar-track {
  background: transparent;
}

/* Style the scrollbar thumb (handle) */
.employee::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 0.25em;
}

.main {
  margin: 0;
  padding: 0;
}

.employeeCard {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 14rem;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 55rem;
  margin-top: 1rem;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
  height: 14rem;
  flex-grow: 65;
}

.image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 5rem;
  flex-grow: 1;
  padding: 1rem;
}

.image img {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
}

.field {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 1rem;
  width: 20rem;
  height: 2rem;
}

.field h3 {
  background-color: #ff6666;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  margin: 0;
  height: 1rem;
  padding: 6px 16px 6px 16px;
  font-size: 1rem;
  font-weight: 700;
  color: #f5f5f5;
  margin-left: 1rem;
  border-radius: 10px;
}

.field h3:first-child {
  background-color: #66ff8a;
  color: #3f3f3f;
  margin-left: 0.5rem;
}

.signed {
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #c0c0c0;
  border-radius: 0 10px 10px 0;
  margin-left: 1rem;
  width: 25rem;
  height: 100%;
}

.signed h3 {
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 600;
}

.date {
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: #f5f5f5;
}

.sign {
  text-align: center;
  font-size: 1rem;
  font-weight: bolder;
  color: #c0c0c0;
}

.download {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  background-image: url("/file.png");
  background-size: 1.5rem;
  background-position: center center;
  background-repeat: no-repeat;
  width: 2rem;
  height: 2rem;
  background-color: #f5f5f5;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
}

.download:hover {
  transition: all 0.2s ease-in-out;
  transform: scale(1.1);
  cursor: pointer;
}