import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv("C:/Users/multicampus/Desktop/특화PJT_자료/course.csv")
data = df[['COURSE_ELEV_DIFF', 'COURSE_UPTIME', 'COURSE_DOWNTIME', 'COURSE_LENGTH']]

# 정규화
scaler = MinMaxScaler()
data_scale = scaler.fit_transform(data)

k = 9
# 그룹 수, random_state 설정
model = KMeans(n_clusters=k, random_state=10)
# 정규화된 데이터에 학습
model.fit(data_scale)
# 클러스터링 결과 각 데이터가 몇 번째 그룹에 속하는지 저장
df['cluster'] = model.fit_predict(data_scale)
print(df.to_string())

pca_num_components = 2
reduced_data = PCA(n_components = pca_num_components).fit_transform(data)
results = pd.DataFrame(reduced_data, columns = ['pca1', 'pca2'])

sns.scatterplot(x="pca1", y="pca2", hue=df['cluster'], data=results)
plt.title("K-means Clustering with 2 dimensions")
plt.show()


