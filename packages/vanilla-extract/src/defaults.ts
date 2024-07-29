import { THEME } from "./contract";

export const emphasizedAccurate = `linear(
  0, 0.00004 0.215%, 0.00015, 0.00034 0.655%, 0.00062 0.88%, 0.00092,
  0.00128 1.267%, 0.00117, 0.00127 1.267%, 0.0013 1.278%, 0.00155, 0.00183,
  0.00213, 0.00245 1.753%, 0.00285, 0.00329, 0.00376 2.168%, 0.00419 2.29%,
  0.004, 0.00418 2.29%, 0.00424 2.304%, 0.00483, 0.00546, 0.00613 2.765%,
  0.00677 2.903%, 0.00663, 0.00671 2.903%, 0.00679 2.907%, 0.00711 2.975%,
  0.00696 2.975%, 0.00712 2.977%, 0.00787 3.128%, 0.00858 3.263%,
  0.00941 3.415%, 0.01019 3.55%, 0.00994, 0.01013 3.55%, 0.01023 3.558%,
  0.01093, 0.01165 3.792%, 0.01135, 0.01166 3.793%, 0.01305 4.008%,
  0.01442 4.207%, 0.01402, 0.01436 4.207%, 0.01448 4.215%, 0.01566,
  0.01689 4.542%, 0.01664, 0.01689 4.542%, 0.01828 4.719%, 0.01959 4.88%,
  0.01936, 0.0195 4.88%, 0.01963 4.884%, 0.0199 4.916%, 0.01966, 0.01979 4.916%,
  0.01992 4.919%, 0.02114, 0.0224 5.204%, 0.02212, 0.0224 5.204%,
  0.02326 5.298%, 0.02296, 0.02324 5.298%, 0.02559 5.546%, 0.02524,
  0.02554 5.546%, 0.02569 5.556%, 0.02675 5.664%, 0.02638, 0.02668 5.664%,
  0.02684 5.672%, 0.02901 5.886%, 0.0286, 0.02891 5.886%, 0.02907 5.892%,
  0.0305 6.027%, 0.03006, 0.03038 6.027%, 0.03054 6.031%, 0.03266 6.225%,
  0.03217, 0.03267 6.225%, 0.03468 6.402%, 0.03415, 0.03465 6.402%,
  0.03482 6.414%, 0.03671 6.575%, 0.03631, 0.03665 6.575%, 0.03682 6.584%,
  0.03875 6.743%, 0.03848, 0.03866 6.743%, 0.03883 6.749%, 0.0408 6.906%,
  0.04055, 0.04073 6.906%, 0.04091 6.915%, 0.04067, 0.04084 6.915%,
  0.04102 6.924%, 0.04322 7.092%, 0.04295, 0.04313 7.092%, 0.04331 7.1%,
  0.04304, 0.04322 7.1%, 0.04341 7.107%, 0.04546 7.259%, 0.04516,
  0.04535 7.259%, 0.04553 7.265%, 0.04572 7.279%, 0.04542, 0.04561 7.279%,
  0.0458 7.284%, 0.04788 7.435%, 0.04756, 0.04775 7.435%, 0.04794 7.439%,
  0.04832 7.466%, 0.04799, 0.04818 7.466%, 0.04838 7.47%, 0.0505 7.618%,
  0.05015, 0.05035 7.618%, 0.05054 7.62%, 0.05113 7.661%, 0.05076,
  0.05115 7.662%, 0.05293 7.782%, 0.05254, 0.05294 7.783%, 0.05373 7.836%,
  0.05334, 0.05374 7.836%, 0.05574 7.967%, 0.05532, 0.05572 7.967%,
  0.05673 8.031%, 0.05631, 0.05671 8.031%, 0.05691 8.042%, 0.05854 8.145%,
  0.05809, 0.0585 8.145%, 0.0587 8.155%, 0.05953 8.206%, 0.05906,
  0.05947 8.206%, 0.05968 8.216%, 0.06154 8.33%, 0.06105, 0.06147 8.33%,
  0.06168 8.338%, 0.06272 8.401%, 0.06222, 0.06263 8.401%, 0.06284 8.408%,
  0.06452 8.508%, 0.064, 0.06442 8.508%, 0.06463 8.514%, 0.0659 8.588%, 0.06536,
  0.06578 8.588%, 0.06599 8.593%, 0.0677 8.691%, 0.06714, 0.06756 8.691%,
  0.06777 8.696%, 0.06928 8.78%, 0.06869, 0.06912 8.78%, 0.06934 8.784%,
  0.07085 8.868%, 0.07046, 0.07068, 0.07089 8.87%, 0.07263 8.965%, 0.072,
  0.07266 8.967%, 0.07441 9.061%, 0.07376, 0.07441 9.061%, 0.07617 9.155%,
  0.07572, 0.07616 9.155%, 0.07793 9.246%, 0.07746, 0.0779 9.246%,
  0.07812 9.256%, 0.07968 9.336%, 0.07941, 0.07963 9.336%, 0.07985 9.345%,
  0.08165 9.435%, 0.08135, 0.08157 9.435%, 0.0818 9.443%, 0.08337 9.521%,
  0.0831, 0.08333 9.521%, 0.08355 9.53%, 0.08328, 0.0835 9.53%, 0.08373 9.539%,
  0.08532 9.616%, 0.08503, 0.08526 9.616%, 0.08549 9.625%, 0.0852,
  0.08542 9.625%, 0.08565 9.633%, 0.08748 9.72%, 0.08718, 0.0874 9.72%,
  0.08763 9.728%, 0.08733, 0.08756 9.728%, 0.08779 9.735%, 0.08939 9.811%,
  0.08908, 0.08931 9.811%, 0.08954 9.818%, 0.08923, 0.08945 9.818%,
  0.08968 9.825%, 0.09153 9.91%, 0.0912, 0.09143 9.91%, 0.09166 9.917%, 0.09133,
  0.09156 9.917%, 0.09179 9.923%, 0.09365 10.008%, 0.09331, 0.09354 10.008%,
  0.09377 10.013%, 0.094 10.024%, 0.09366, 0.09389 10.024%, 0.09412 10.029%,
  0.09575 10.102%, 0.0954, 0.09563 10.102%, 0.09586 10.107%, 0.0961 10.118%,
  0.09574, 0.09597 10.118%, 0.0962 10.123%, 0.09784 10.195%, 0.09747,
  0.09771 10.195%, 0.09794 10.199%, 0.09841 10.22%, 0.09804, 0.09827 10.22%,
  0.0985 10.224%, 0.10014 10.296%, 0.09976, 0.1 10.296%, 0.10023 10.299%,
  0.1007 10.32%, 0.10031, 0.10055 10.32%, 0.10078 10.323%, 0.10243 10.394%,
  0.10203, 0.10227 10.394%, 0.10251 10.397%, 0.10298 10.417%, 0.10258,
  0.10281 10.417%, 0.10305 10.42%, 0.10494 10.499%, 0.10452, 0.10476 10.499%,
  0.105 10.502%, 0.10547 10.522%, 0.10505, 0.10529, 0.10553 10.524%,
  0.10719 10.593%, 0.10676 10.593%, 0.10723 10.595%, 0.10795 10.624%, 0.10751,
  0.10799 10.625%, 0.10965 10.693%, 0.10921, 0.10968 10.694%, 0.11064 10.733%,
  0.11019, 0.11066 10.734%, 0.11234 10.801%, 0.11187, 0.11235 10.801%,
  0.11307 10.83%, 0.1126, 0.11308 10.83%, 0.11476 10.896%, 0.11428,
  0.11476 10.896%, 0.11572 10.933%, 0.11523, 0.11571 10.933%, 0.1174 10.998%,
  0.1169, 0.11738 10.998%, 0.11858 11.043%, 0.11808, 0.11856 11.043%,
  0.12025 11.106%, 0.11973, 0.12022 11.106%, 0.12118 11.141%, 0.12066,
  0.12114 11.141%, 0.12138 11.149%, 0.12284 11.203%, 0.1223, 0.12278 11.203%,
  0.12303 11.21%, 0.124 11.246%, 0.12345, 0.12394 11.246%, 0.12418 11.252%,
  0.12564 11.306%, 0.12508, 0.12557 11.306%, 0.12581 11.312%, 0.12702 11.356%,
  0.12646, 0.12695 11.356%, 0.12719 11.362%, 0.12865 11.414%, 0.12808,
  0.12856 11.414%, 0.1288 11.42%, 0.13002 11.463%, 0.12944, 0.12993 11.463%,
  0.13017 11.468%, 0.13163 11.52%, 0.13104, 0.13153 11.52%, 0.13177 11.524%,
  0.13299 11.567%, 0.13239, 0.13288 11.567%, 0.13312 11.571%, 0.13459 11.622%,
  0.13397, 0.13446 11.622%, 0.1347 11.626%, 0.13617 11.676%, 0.13555,
  0.13603 11.676%, 0.13628 11.68%, 0.13775 11.73%, 0.13711, 0.1376 11.73%,
  0.13785 11.733%, 0.13932 11.782%, 0.13867, 0.13916 11.782%, 0.13941 11.785%,
  0.14088 11.834%, 0.14047, 0.14071 11.834%, 0.14095 11.837%, 0.14267 11.894%,
  0.14201, 0.14249, 0.14274 11.896%, 0.14421 11.944%, 0.14378, 0.14427 11.946%,
  0.14599 12.001%, 0.14555, 0.14604 12.003%, 0.14776 12.058%, 0.14706,
  0.14779 12.059%, 0.14927 12.106%, 0.1488, 0.14929 12.106%, 0.15102 12.16%,
  0.15054, 0.15103 12.161%, 0.153 12.222%, 0.15251, 0.153 12.222%,
  0.15472 12.275%, 0.15422, 0.15472 12.275%, 0.15644 12.327%, 0.15617,
  0.15642 12.327%, 0.15839 12.386%, 0.15787, 0.15836 12.386%, 0.16033 12.444%,
  0.15979, 0.16028 12.444%, 0.16053 12.45%, 0.16201 12.493%, 0.16171,
  0.16195 12.493%, 0.1622 12.499%, 0.16392 12.549%, 0.16361, 0.16386 12.549%,
  0.1641 12.554%, 0.16607 12.611%, 0.16575, 0.16599 12.611%, 0.16624 12.616%,
  0.16796 12.665%, 0.16763, 0.16787 12.665%, 0.16812 12.67%, 0.16984 12.718%,
  0.16954, 0.16979 12.718%, 0.17003 12.724%, 0.16974, 0.16998 12.724%,
  0.17023 12.729%, 0.17195 12.778%, 0.17165, 0.17189 12.778%, 0.17214 12.783%,
  0.17183, 0.17208 12.783%, 0.17232 12.788%, 0.17404 12.836%, 0.17374,
  0.17398 12.836%, 0.17423 12.841%, 0.17392, 0.17416 12.841%, 0.17441 12.846%,
  0.17613 12.893%, 0.17581, 0.17606 12.893%, 0.1763 12.897%, 0.17599,
  0.17623 12.897%, 0.17648 12.902%, 0.1782 12.949%, 0.17788, 0.17812 12.949%,
  0.17837 12.953%, 0.17805, 0.17829 12.953%, 0.17854 12.958%, 0.1805 13.01%,
  0.18017, 0.18042 13.01%, 0.18066 13.015%, 0.18033, 0.18058 13.015%,
  0.18082 13.019%, 0.18254 13.064%, 0.18221, 0.18245 13.064%, 0.18269 13.069%,
  0.18236, 0.18261 13.069%, 0.18285 13.073%, 0.18481 13.124%, 0.18447,
  0.18471 13.124%, 0.18496 13.128%, 0.18462, 0.18486 13.128%, 0.18511 13.132%,
  0.18706 13.182%, 0.18672, 0.18696 13.182%, 0.18721 13.186%, 0.18686,
  0.18711 13.186%, 0.18735 13.19%, 0.1893 13.24%, 0.18895, 0.1892 13.24%,
  0.18944 13.243%, 0.18969 13.249%, 0.18933, 0.18958 13.249%, 0.18982 13.253%,
  0.19177 13.302%, 0.19142, 0.19166 13.302%, 0.1919 13.305%, 0.19155,
  0.19179 13.305%, 0.19203 13.309%, 0.19398 13.357%, 0.19362, 0.19386 13.357%,
  0.1941 13.36%, 0.19435 13.366%, 0.19399, 0.19423 13.366%, 0.19447 13.369%,
  0.19642 13.417%, 0.19605, 0.19629 13.417%, 0.19653 13.42%, 0.19678 13.426%,
  0.19641, 0.19665 13.426%, 0.19689 13.429%, 0.19883 13.477%, 0.19846,
  0.1987 13.477%, 0.19895 13.479%, 0.19919 13.485%, 0.19881, 0.19906 13.485%,
  0.1993 13.488%, 0.20124 13.534%, 0.20086, 0.2011 13.534%, 0.20134 13.537%,
  0.20183 13.549%, 0.20145, 0.20169 13.549%, 0.20193 13.551%, 0.20386 13.597%,
  0.20348, 0.20372, 0.20396 13.599%, 0.2042 13.605%, 0.20382, 0.20406 13.605%,
  0.2043 13.607%, 0.20647 13.658%, 0.20608, 0.20632 13.658%, 0.20656 13.661%,
  0.2068 13.666%, 0.20641, 0.20665 13.666%, 0.20689 13.668%, 0.20906 13.719%,
  0.20867, 0.20915 13.721%, 0.20963 13.732%, 0.20923 13.732%, 0.20971 13.734%,
  0.21163 13.778%, 0.21123, 0.21171 13.779%, 0.21219 13.79%, 0.21179,
  0.21227 13.792%, 0.21443 13.841%, 0.21402, 0.2145 13.843%, 0.21498 13.853%,
  0.21457 13.853%, 0.21505 13.855%, 0.21696 13.898%, 0.21655, 0.21703 13.899%,
  0.21774 13.915%, 0.21733, 0.21781 13.916%, 0.21972 13.958%, 0.2193,
  0.21978 13.96%, 0.22049 13.975%, 0.22007, 0.22055 13.977%, 0.22269 14.023%,
  0.22227, 0.22274 14.024%, 0.22322 14.035%, 0.2228, 0.22327 14.036%,
  0.22564 14.087%, 0.22521, 0.22569 14.088%, 0.22616 14.098%, 0.22574,
  0.22621 14.099%, 0.22833 14.144%, 0.22791, 0.22838 14.145%, 0.22908 14.159%,
  0.22866, 0.22913 14.16%, 0.23148 14.21%, 0.23105, 0.23152 14.21%,
  0.23222 14.225%, 0.23179, 0.23226 14.226%, 0.23437 14.269%, 0.23393,
  0.2344 14.27%, 0.23534 14.289%, 0.2349, 0.23537 14.289%, 0.23747 14.332%,
  0.23703, 0.2375 14.333%, 0.23843 14.352%, 0.23799, 0.23846 14.352%,
  0.24079 14.399%, 0.24034, 0.24081 14.399%, 0.24151 14.413%, 0.24106,
  0.24153 14.413%, 0.24384 14.459%, 0.2434, 0.24386 14.459%, 0.24479 14.477%,
  0.24434, 0.2448 14.478%, 0.24711 14.523%, 0.24666, 0.24713 14.523%,
  0.24805 14.541%, 0.2476, 0.24806 14.541%, 0.25059 14.589%, 0.25014,
  0.2506 14.589%, 0.25128 14.602%, 0.25083, 0.25129 14.603%, 0.25381 14.65%,
  0.25336, 0.25381 14.65%, 0.25473 14.667%, 0.25428, 0.25473 14.667%,
  0.25724 14.714%, 0.25678, 0.25724 14.714%, 0.25837 14.735%, 0.25792,
  0.25838 14.735%, 0.26087 14.78%, 0.26041, 0.26087 14.78%, 0.26177 14.796%,
  0.26132, 0.26177 14.796%, 0.26447 14.845%, 0.26402, 0.26447 14.845%,
  0.26537 14.861%, 0.26492, 0.26536 14.861%, 0.26806 14.909%, 0.2676,
  0.26805 14.909%, 0.26917 14.928%, 0.26871, 0.26916 14.928%, 0.27184 14.974%,
  0.27138, 0.27183 14.974%, 0.27294 14.993%, 0.27249, 0.27293 14.993%,
  0.27559 15.039%, 0.27514, 0.27558 15.039%, 0.27669 15.057%, 0.27624,
  0.27668 15.057%, 0.27954 15.105%, 0.2791, 0.27954 15.105%, 0.28063 15.123%,
  0.28019, 0.28063 15.123%, 0.28347 15.17%, 0.28303, 0.28346 15.17%,
  0.28455 15.188%, 0.28411, 0.28455 15.188%, 0.28759 15.237%, 0.28715,
  0.28758 15.237%, 0.28866 15.255%, 0.28823, 0.28866 15.255%, 0.29168 15.303%,
  0.29125, 0.29168 15.303%, 0.29275 15.32%, 0.29232, 0.29275 15.32%,
  0.29596 15.37%, 0.29554, 0.29596 15.37%, 0.29703 15.386%, 0.29661,
  0.29703 15.386%, 0.30043 15.438%, 0.30001, 0.30043 15.439%, 0.30128 15.451%,
  0.30087, 0.30129 15.452%, 0.30487 15.505%, 0.30446, 0.30488 15.506%,
  0.30572 15.518%, 0.30531, 0.30573 15.518%, 0.30928 15.571%, 0.30889,
  0.3093 15.571%, 0.31013 15.583%, 0.30974, 0.31016 15.583%, 0.31408 15.64%,
  0.3137, 0.31411 15.641%, 0.31473 15.65%, 0.31435, 0.31476 15.65%,
  0.31886 15.708%, 0.31849, 0.3189 15.709%, 0.31951 15.717%, 0.31915,
  0.31956 15.718%, 0.32361 15.774%, 0.32326, 0.32366 15.775%, 0.32427 15.783%,
  0.32392, 0.32432 15.784%, 0.32874 15.844%, 0.3284, 0.3288, 0.329 15.847%,
  0.32868, 0.32908 15.848%, 0.33384 15.912%, 0.33353, 0.33392, 0.33412 15.915%,
  0.33381 15.915%, 0.33421 15.917%, 0.3393 15.983%, 0.33873, 0.33932 15.983%,
  0.34474 16.052%, 0.34403, 0.3448 16.053%, 0.35053 16.124%, 0.34989, 0.35046,
  0.35065 16.125%, 0.35518 16.18%, 0.35459, 0.35516 16.18%, 0.35535 16.182%,
  0.36258 16.267%, 0.36209, 0.36265 16.268%, 0.36576 16.304%, 0.36532,
  0.36588 16.305%, 0.37646 16.423%, 0.37573, 0.37645 16.423%, 0.37663 16.425%,
  0.38403, 0.39164 16.583%, 0.39111, 0.39165 16.583%, 0.39958 16.662%,
  0.39928 16.662%, 0.40008 16.667%, 0.40001 16.667%, 0.40694 16.736%,
  0.42199 16.887%, 0.4359 17.03%, 0.44683 17.145%, 0.45726 17.257%,
  0.46719 17.367%, 0.47679, 0.48604, 0.49512 17.69%, 0.50386 17.796%, 0.51241,
  0.52079 18.013%, 0.52882 18.12%, 0.53667, 0.54434 18.338%, 0.5528,
  0.56107 18.589%, 0.56916, 0.57705, 0.58476 18.98%, 0.59227 19.114%, 0.59971,
  0.60689 19.389%, 0.61405 19.532%, 0.62102, 0.62781 19.823%, 0.63456,
  0.64114 20.127%, 0.64768, 0.65404 20.444%, 0.66036 20.609%, 0.66415 20.71%,
  0.66792, 0.67168, 0.67527 21.023%, 0.679, 0.68257, 0.68613 21.349%, 0.68967,
  0.69321 21.574%, 0.69658 21.685%, 0.70009 21.803%, 0.70343 21.918%,
  0.70616 22.014%, 0.71019 22.158%, 0.71353 22.281%, 0.71671 22.4%, 0.71987,
  0.72303 22.645%, 0.72625 22.774%, 0.72957 22.91%, 0.73271 23.041%,
  0.73585 23.175%, 0.73897 23.312%, 0.74193 23.444%, 0.74503 23.585%,
  0.74796 23.721%, 0.75089, 0.7538 24.001%, 0.7567, 0.75958 24.29%, 0.76246,
  0.76532 24.589%, 0.76816, 0.77099 24.897%, 0.77381 25.055%, 0.77662 25.216%,
  0.77941 25.379%, 0.78218 25.544%, 0.78494 25.712%, 0.78755 25.874%,
  0.79028 26.048%, 0.79287 26.215%, 0.79557 26.393%, 0.79812 26.565%,
  0.80066 26.74%, 0.80327 26.923%, 0.8058, 0.80828 27.285%, 0.81079 27.472%,
  0.81315 27.651%, 0.81551 27.833%, 0.81785 28.018%, 0.8203 28.215%, 0.82261,
  0.82491 28.597%, 0.82719 28.791%, 0.82996 29.032%, 0.83258 29.266%,
  0.83519 29.503%, 0.83777 29.743%, 0.83678, 0.83776 29.743%, 0.83788 29.753%,
  0.84139 30.089%, 0.84475 30.42%, 0.84736 30.685%, 0.84996 30.953%,
  0.85252 31.225%, 0.85507 31.501%, 0.85759 31.781%, 0.8601 32.066%,
  0.86257 32.354%, 0.86492 32.632%, 0.86558 32.713%, 0.8645, 0.8655 32.713%,
  0.86561 32.715%, 0.86856 33.078%, 0.87051 33.323%, 0.87234 33.557%,
  0.87426 33.808%, 0.87606 34.047%, 0.87795 34.302%, 0.87972 34.546%,
  0.88158 34.807%, 0.88332 35.056%, 0.88606 35.456%, 0.88876 35.862%, 0.88763,
  0.88872 35.862%, 0.88881 35.871%, 0.89175 36.326%, 0.89464 36.789%,
  0.89749 37.259%, 0.9002 37.721%, 0.90085 37.833%, 0.90007, 0.90081 37.833%,
  0.9009 37.841%, 0.90236 38.098%, 0.9039 38.373%, 0.9056 38.683%,
  0.90729 38.996%, 0.90895, 0.9106 39.63%, 0.91007, 0.91058 39.63%,
  0.91067 39.644%, 0.91127 39.761%, 0.91073, 0.91125 39.761%, 0.91133 39.773%,
  0.91345 40.195%, 0.91554 40.622%, 0.91727 40.985%, 0.91897 41.35%, 0.91843,
  0.91892 41.35%, 0.919 41.356%, 0.92012 41.6%, 0.91958, 0.92006 41.6%,
  0.92013 41.604%, 0.92265 42.167%, 0.9252 42.755%, 0.92634 43.025%, 0.9258,
  0.92633 43.025%, 0.92648 43.058%, 0.92783 43.383%, 0.92728, 0.9278 43.383%,
  0.92788 43.396%, 0.9295 43.795%, 0.93124 44.234%, 0.93295 44.677%, 0.93241,
  0.93291 44.677%, 0.93298 44.684%, 0.93465 45.129%, 0.93411, 0.9346 45.129%,
  0.93467 45.133%, 0.93659 45.655%, 0.93847 46.183%, 0.939 46.334%, 0.93846,
  0.93899 46.334%, 0.93965 46.521%, 0.94082 46.864%, 0.94028, 0.9408 46.864%,
  0.94086 46.877%, 0.94208 47.239%, 0.94328 47.604%, 0.94452 47.989%, 0.94399,
  0.94448 47.989%, 0.94455 47.997%, 0.94649 48.617%, 0.94596, 0.94644 48.617%,
  0.9465 48.621%, 0.9481 49.146%, 0.94967 49.675%, 0.94915, 0.94967 49.675%,
  0.95018 49.851%, 0.9517 50.383%, 0.95118, 0.95169 50.383%, 0.95174 50.397%,
  0.95333 50.97%, 0.95446 51.388%, 0.95395, 0.95443 51.388%, 0.95449 51.397%,
  0.95653 52.175%, 0.95602, 0.95649 52.175%, 0.95654 52.179%, 0.95776 52.66%,
  0.95901 53.163%, 0.95851, 0.959 53.163%, 0.95983 53.504%, 0.96084 53.929%,
  0.96108 54.03%, 0.96059, 0.96107 54.03%, 0.96111 54.044%, 0.96219,
  0.96325 54.978%, 0.96277, 0.96322 54.978%, 0.96327 54.986%, 0.96425 55.434%,
  0.96527 55.903%, 0.96484, 0.96523 55.903%, 0.96528 55.907%, 0.96622 56.356%,
  0.96723 56.848%, 0.96686, 0.96723 56.848%, 0.96727 56.867%, 0.96822 57.338%,
  0.96915 57.811%, 0.96885, 0.96913 57.811%, 0.96917 57.824%, 0.97008 58.297%,
  0.971 58.791%, 0.97075, 0.97098 58.791%, 0.97102 58.799%, 0.97199 59.335%,
  0.9728 59.789%, 0.97259, 0.97277 59.789%, 0.97281 59.792%, 0.97367 60.287%,
  0.97454 60.804%, 0.97435, 0.97452 60.804%, 0.97456 60.814%, 0.97459 60.834%,
  0.9744, 0.97457 60.834%, 0.97461 60.843%, 0.97589 61.629%, 0.97626 61.856%,
  0.97607, 0.97623 61.856%, 0.97627 61.863%, 0.97633 61.905%, 0.97615,
  0.97631 61.905%, 0.97634 61.911%, 0.97791 62.925%, 0.97773, 0.97788 62.925%,
  0.97791 62.929%, 0.97801 62.991%, 0.97783, 0.97798 62.991%, 0.97801 62.995%,
  0.97949 64.009%, 0.97932, 0.97947, 0.9795 64.011%, 0.97964 64.114%, 0.97947,
  0.97962, 0.97965 64.116%, 0.97982 64.24%, 0.98107 65.15%, 0.9809,
  0.98107 65.15%, 0.98121 65.253%, 0.98104, 0.98121 65.253%, 0.98255 66.284%,
  0.98239, 0.98255 66.284%, 0.98273 66.426%, 0.98257, 0.98273 66.426%,
  0.98281 66.485%, 0.98402 67.475%, 0.98386, 0.98401 67.475%, 0.98404 67.491%,
  0.98418 67.614%, 0.98403, 0.98418 67.614%, 0.9842 67.63%, 0.98541 68.679%,
  0.98526, 0.9854 68.679%, 0.98543 68.693%, 0.98561 68.858%, 0.98546,
  0.9856 68.858%, 0.9858 69.036%, 0.98677 69.938%, 0.98664, 0.98676 69.938%,
  0.98679 69.95%, 0.98696 70.114%, 0.98682, 0.98695 70.114%, 0.98697 70.126%,
  0.98806 71.209%, 0.98808 71.229%, 0.98795, 0.98807 71.229%, 0.98809 71.241%,
  0.98825 71.404%, 0.98812, 0.98824 71.404%, 0.98826 71.415%, 0.98851 71.679%,
  0.98933 72.554%, 0.98921, 0.98932 72.554%, 0.98934 72.564%, 0.9895 72.746%,
  0.98938, 0.98949 72.746%, 0.98951 72.757%, 0.99043 73.809%, 0.99053 73.93%,
  0.99042, 0.99052 73.93%, 0.99054 73.94%, 0.99069 74.122%, 0.99058,
  0.99068 74.122%, 0.9907 74.131%, 0.99095 74.434%, 0.99166 75.338%, 0.99156,
  0.99166 75.338%, 0.99167 75.348%, 0.99183 75.548%, 0.99173, 0.99182 75.548%,
  0.99183 75.558%, 0.99253 76.498%, 0.99275 76.797%, 0.99265, 0.99274 76.797%,
  0.99275 76.807%, 0.99289 77.006%, 0.9928, 0.99289 77.006%, 0.9929 77.017%,
  0.99308 77.275%, 0.99378 78.326%, 0.9937, 0.99377 78.326%, 0.99379 78.337%,
  0.99389 78.495%, 0.99381, 0.99388 78.495%, 0.9939 78.507%, 0.99438 79.295%,
  0.99475 79.904%, 0.99467, 0.99474 79.904%, 0.99483 80.054%, 0.99476,
  0.99483 80.054%, 0.99492 80.205%, 0.99564 81.529%, 0.99558, 0.99564 81.529%,
  0.99571 81.662%, 0.99565, 0.99571 81.662%, 0.99574 81.717%, 0.99611 82.472%,
  0.99648 83.241%, 0.99642, 0.99648 83.242%, 0.9965 83.3%, 0.99645, 0.99649,
  0.9965 83.301%, 0.99694 84.297%, 0.99724 85.037%, 0.99718, 0.99724 85.037%,
  0.99725 85.051%, 0.99774 86.373%, 0.99791 86.859%, 0.99784, 0.99791 86.859%,
  0.99792 86.869%, 0.99808 87.356%, 0.99854 88.91%, 0.99849, 0.99854 88.91%,
  0.99855 88.922%, 0.99873 89.621%, 0.99893 90.404%, 0.99889, 0.99892 90.404%,
  0.99893 90.417%, 0.99912 91.291%, 0.99944 92.971%, 0.99953 93.533%,
  0.99951 93.533%, 0.99953 93.535%, 0.99958 93.924%, 0.99957, 0.99958 93.924%,
  0.99959 93.935%, 0.99968 94.682%, 0.99986 96.425%, 0.99996 98.197%, 1
)`;

export const emphasizedOptimized = `linear(
  0, 0.001, 0.002 1.8%, 0.004 2.3%, 0.01, 0.02 4.9%, 0.034, 0.053,
  0.074 9.1% 9.1%, 0.1, 0.129 11.4%, 0.128 11.4%, 0.16, 0.194 13.4%, 0.231,
  0.271 15%, 0.345 16.1%, 0.344 16.1%, 0.477 17.5%, 0.544 18.3%, 0.607,
  0.66 20.6%, 0.69, 0.717, 0.742, 0.765, 0.788, 0.808, 0.827, 0.845 30.4%,
  0.865 32.6%, 0.866, 0.865, 0.866 32.7%, 0.869 33.1%, 0.883 35.1%, 0.889 35.9%,
  0.888, 0.889 35.9%, 0.9 37.7%, 0.901, 0.9, 0.901 37.8%, 0.904 38.4%,
  0.916 40.6%, 0.929 43.8%, 0.942 47.2%, 0.953 51%, 0.963 55%, 0.972 59.3%,
  0.979 64%, 0.986 69%, 0.991 74.4%, 0.995 80.2%, 0.998 86.4%, 0.999 93%, 1
)`;


export const DEFAULT_EASING = {
  linear: "linear",
  emphasized: emphasizedOptimized,
  emphasizedAccelerate: "cubic-bezier(0.3, 0.0, 0.8, 0.15)",
  emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1.0)",
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  standardDecelerate: "cubic-bezier(0, 0, 0, 1)",
  standardAccelerate: "cubic-bezier(0.3, 0, 1, 1)",
} as const;

export const DEFAULT_DURATION = {
  short1: "50ms",
  short2: "100ms",
  short3: "150ms",
  short4: "200ms",
  medium1: "250ms",
  medium2: "300ms",
  medium3: "350ms",
  medium4: "400ms",
  long1: "450ms",
  long2: "500ms",
  long3: "550ms",
  long4: "600ms",
  extraLong1: "700ms",
  extraLong2: "800ms",
  extraLong3: "900ms",
  extraLong4: "1000ms",
} as const;

export const DEFAULT_SHAPE = {
  extraSmall: "4px",
  small: "8px",
  medium: "12px",
  large: "16px",
  extraLarge: "28px",
  full: "9999px",
} as const;

export const DEFAULT_TYPOGRAPHY = {
  display: {
    large: {
      fontFamily: THEME.typeface.brand,
      fontSize: "57px",
      fontWeight: "400",
      lineHeight: "64px",
      letterSpacing: "-0.25px",
    },
    medium: {
      fontFamily: THEME.typeface.brand,
      fontSize: "45px",
      fontWeight: "400",
      lineHeight: "52px",
      letterSpacing: "0px",
    },
    small: {
      fontFamily: THEME.typeface.brand,
      fontSize: "36px",
      fontWeight: "400",
      lineHeight: "44px",
      letterSpacing: "0px",
    },
  },
  headline: {
    large: {
      fontFamily: THEME.typeface.brand,
      fontSize: "32px",
      fontWeight: "400",
      lineHeight: "40px",
      letterSpacing: "0px",
    },
    medium: {
      fontFamily: THEME.typeface.brand,
      fontSize: "28px",
      fontWeight: "400",
      lineHeight: "36px",
      letterSpacing: "0px",
    },
    small: {
      fontFamily: THEME.typeface.brand,
      fontSize: "24px",
      fontWeight: "400",
      lineHeight: "32px",
      letterSpacing: "0px",
    },
  },
  title: {
    large: {
      fontFamily: THEME.typeface.brand,
      fontSize: "22px",
      fontWeight: "400",
      lineHeight: "28px",
      letterSpacing: "0px",
    },
    medium: {
      fontFamily: THEME.typeface.plain,
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "24px",
      letterSpacing: "0.15px",
    },
    small: {
      fontFamily: THEME.typeface.plain,
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: "20px",
      letterSpacing: "0.1px",
    },
  },
  body: {
    large: {
      fontFamily: THEME.typeface.plain,
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "24px",
      letterSpacing: "0.5px",
    },
    medium: {
      fontFamily: THEME.typeface.plain,
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "20px",
      letterSpacing: "0.25px",
    },
    small: {
      fontFamily: THEME.typeface.plain,
      fontSize: "12px",
      fontWeight: "400",
      lineHeight: "16px",
      letterSpacing: "0.4px",
    },
  },
  label: {
    large: {
      fontFamily: THEME.typeface.plain,
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: "20px",
      letterSpacing: "0.1px",
    },
    medium: {
      fontFamily: THEME.typeface.plain,
      fontSize: "12px",
      fontWeight: "500",
      lineHeight: "16px",
      letterSpacing: "0.5px",
    },
    small: {
      fontFamily: THEME.typeface.plain,
      fontSize: "11px",
      fontWeight: "500",
      lineHeight: "16px",
      letterSpacing: "0.5px",
    },
  },
};
