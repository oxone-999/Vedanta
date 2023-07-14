import { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../../../constants";
import Popularjobs from "../popular/Popularjobs";
import Welcome from "../welcome/Welcome";
import ScreenHeaderBtn from "../../common/header/ScreenHeaderBtn";

const Home = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension="60%"
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={images.profile}
              dimension="100%"
            />
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, padding: SIZES.medium }}>
        <Welcome />
        <Popularjobs />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
