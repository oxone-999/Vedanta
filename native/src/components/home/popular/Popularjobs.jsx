import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import styles from "./popularjobs.style";

import EmployeeCard from "../../common/cards/employee/EmployeeCard";

const Popularjobs = () => {
  const router = useRouter();
  const loading = false;
  const error = false;

  const employees = [
    {
      id: 1,
      name: "Rajesh",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Rajesh",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "Rajesh",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Employees</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.headerBtn}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={employees}
            renderItem={({ item }) => (
              <EmployeeCard item={item} />
            )}
            keyExtractor={(item) => item?.id}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
