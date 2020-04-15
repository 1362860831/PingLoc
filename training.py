#coding:utf-8
#import tensorflow as tf
print("Loading Components Now...")
import numpy as np
import pandas as pd
import os
import k_fold_split as kfs
import init_data2 as id
import time

from sklearn import svm
from sklearn import linear_model
from sklearn import tree
from sklearn import naive_bayes
from sklearn import neighbors
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

from sklearn.externals import joblib

print("Loading Over...")

def train_mod(function,name,result):
	accuracy_vector = []
	for i in range(0,10):
		train,test,train_y,test_y=get_data(i)
		f = function.fit(train,train_y)
		# start_time = time.time()
		pre = function.predict(test)
		# end_time = time.time()
		# time_cost = end_time-start_time
		# print(time_cost)
		accuracy=accuracy_score(test_y,pre)
		accuracy_vector.append(accuracy)
	joblib.dump(f,  r"D:\Designer\TEST_HASH\\" + name+"test.pkl")
	print(name+"_accuracy:",np.mean(accuracy_vector))
	result.append(np.mean(accuracy_vector))
	print(name+"_all_window:",result)

def get_data(i):
	train_path = r"D:\Designer\TEST_HASH\data\train_{}.csv".format(i)
	test_path = r"D:\Designer\TEST_HASH\data\val_{}.csv".format(i)

	#读取csv文件中指定的COLUMN的列的数据，header表示从第几个有效数据读起，默认为0
	train = pd.read_csv(train_path)
	test = pd.read_csv(test_path)

	#真正训练的时候不需要加上标签一起训练，所以Species并不是一个特征列
	train_y = train.pop("SPECIES")          #这里train_y的值是Species这一列的数据向量，而train中，已经没有这个值，换句话说，train_y是标签值，而train是训练数据
	test_y = test.pop("SPECIES")
	return train,test,train_y,test_y


SVM_result = []
tree_result=[]
bayes_result = []
knn_result = []
random_forest_result=[]
for window in range(25,26):
	id.init_data(window,r"D:\Designer\hash",r"D:\Designer\TEST_HASH",False)

	kfs.run_k_fold_split(10)
	print("generate dataset and trainset OK!")

	#加载数据集


	train_mod(svm.SVC(),"svm",SVM_result)
	train_mod(tree.DecisionTreeClassifier(criterion='entropy'),"tree",tree_result)
	train_mod(naive_bayes.GaussianNB(),"bayes",bayes_result)
	train_mod(neighbors.KNeighborsClassifier(n_neighbors = 3),"knn",knn_result)
	train_mod(RandomForestClassifier(),"random_forest",random_forest_result)


